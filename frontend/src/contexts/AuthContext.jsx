import { createContext, useContext, useEffect, useState } from "react";
import { setAuthTokens, clearAuthTokens, getAccessToken } from "axios-jwt";
import httpService, { login as httpLogin, logout as httpLogout } from "../services/httpService";

const AuthContext = createContext(null)


const AuthProvider = ({ children }) => {
    const [user, setUser ] = useState(null)
    useEffect(() => {
        (async ()=> {
            try {
                const access = await getAccessToken();
                if (!access) {
                    console.log("ANONYMOUS USER");
                    setUser(null)
                return;
                }
                const { data } = await httpService.get("/auth/users/me")
                setUser(data)
                console.log(data)
            } catch {
                console.log("Something went wrong.")
            }
            
        })()
    }, [])

    const login = async (email, password) => {
        try {
            await httpLogin({email, password})

            const { user } = await httpService.get("/auth/users/me")
            console.log(user)
            setUser(user)
        } catch (error) {
            console.log("LOGIN FAILED: ", error)
        }
        
      }
      
      const logout = async () => clearAuthTokens()

    return <AuthContext.Provider value={{ user, login, logout }}>
        { children }
    </AuthContext.Provider>
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext)