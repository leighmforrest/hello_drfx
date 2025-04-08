import { createContext, useContext, useEffect, useState } from "react";
import ApiClient from "../ApiClient";
import { BASE_URL ,endpoints } from "../settings";
import { clearAuthTokens, getAccessToken, setAuthTokens } from "axios-jwt";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const token = await getAccessToken();
                if (!token) {
                    setUser(null);
                } else {
                    const { data } = await ApiClient.get(endpoints.user);
                    setUser(data);
                }
            } catch (error) {
                console.error("Failed to fetch user: ", error);
                if (error.response?.status === 401) {
                    logout(); // Log out on invalid token
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await ApiClient.post(endpoints.login, { email, password });
            await setAuthTokens({
                accessToken: data.access,
                refreshToken: data.refresh
            });
            const { data: userData } = await ApiClient.get(endpoints.user);
            console.log("👀 Fetching user with:", `${BASE_URL}${endpoints.user}`);
            setUser(userData);
            return true;
        } catch (error) {
            console.error("The user could not be authenticated.", error);
            return false;
        }
    };

    const logout = () => {
        clearAuthTokens();
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);
