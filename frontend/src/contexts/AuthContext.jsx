import { useReducer, createContext, useContext, useEffect } from "react";
import authReducer, { initialState } from "../reducers/authReducer";
import httpService, { login as httpLogin, logout as httpLogout } from "../services/httpService";
import { getRefreshToken } from "axios-jwt";
import { useNavigate } from "react-router";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    ...initialState,
    isAuthenticated: false, // Add isAuthenticated to state
  });
  const navigate = useNavigate();

  const loadUser = async () => {
    try {
      const hasToken = !!(await getRefreshToken());

      if (!hasToken) {
        dispatch({ type: "AUTH_REQUEST_FAILURE" });
        return;
      }

      dispatch({ type: "AUTH_REQUEST_INIT" });
      const response = await httpService.get("/auth/users/me/");
      dispatch({ type: "USER_FETCH_SUCCESS", payload: response.data });
    } catch (e) {
      dispatch({ type: "AUTH_REQUEST_FAILURE" });
      console.error("Error loading user:", e);
      await logout();
    }
  };

  useEffect(() => {
    (async () => {
      const tokenExists = !!(await getRefreshToken());
      dispatch({ type: "SET_AUTH_STATUS", payload: tokenExists }); // Set isAuthenticated state
      if (tokenExists) {
        await loadUser();
      }
    })();
  }, []);

  const login = async (email, password) => {
    try {
      dispatch({ type: "AUTH_REQUEST_INIT" });
      await httpLogin({ email, password });
      dispatch({ type: "SET_AUTH_STATUS", payload: true }); // User is authenticated
      await loadUser();
      dispatch({ type: "USER_LOGIN_SUCCESS" });
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.response.data.detail);
      dispatch({ type: "AUTH_REQUEST_FAILURE" });
    }
  };

  const logout = async () => {
    try {
      await httpLogout();
      dispatch({ type: "USER_LOGOUT" });
      dispatch({ type: "SET_AUTH_STATUS", payload: false }); // User is not authenticated
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
