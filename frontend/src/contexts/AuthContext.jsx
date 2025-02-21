import { useReducer, createContext, useContext, useEffect } from "react";
import authReducer, { initialState } from "../reducers/authReducer";
import httpService, { login as httpLogin, logout as httpLogout } from "../services/httpService";
import { getRefreshToken } from "axios-jwt";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

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
      console.error("Error loading user:", e);
      dispatch({ type: "AUTH_REQUEST_FAILURE" });
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const tokenExists = !!(await getRefreshToken());
      dispatch({ type: "SET_AUTH_STATUS", payload: tokenExists });

      if (tokenExists) {
        await loadUser();
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      dispatch({ type: "AUTH_REQUEST_INIT" });
      await httpLogin({ email, password });
      await loadUser();
      dispatch({ type: "USER_LOGIN_SUCCESS" });
      toast.success(`The user '${email}' is logged in!`);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Login failed. Please try again.");
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

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
