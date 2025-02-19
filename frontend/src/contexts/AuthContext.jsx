import { useReducer, createContext, useContext, useEffect } from "react";
import authReducer, { initialState } from "../reducers/authReducer";
import httpService, { login as httpLogin, logout as httpLogout } from "../services/httpService";
import { getRefreshToken } from "axios-jwt";
import { useNavigate } from "react-router";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
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
      await loadUser();
    })();
  }, []);

  const login = async (email, password) => {
    try {
      dispatch({ type: "AUTH_REQUEST_INIT" });
      await httpLogin({ email, password });
      await loadUser();
      dispatch({ type: "USER_LOGIN_SUCCESS" });
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      dispatch({ type: "AUTH_REQUEST_FAILURE" });
    }
  };

  const logout = async () => {
    try {
      await httpLogout();
      dispatch({ type: "USER_LOGOUT" });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Derive isAuthenticated dynamically based on refresh token presence
  const isAuthenticated = async () => !!(await getRefreshToken());

  return (
    <AuthContext.Provider value={{ ...state, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
