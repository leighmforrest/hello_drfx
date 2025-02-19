import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null)


const AuthProvider = ({ children }) => {
    const [user, setUser ] = useState(1)
    useEffect(() => {}, [])

    const login = async () => {}

    const logout = async () => {}

    return <AuthContext.Provider value={{ user, login, logout }}>
        { children }
    </AuthContext.Provider>
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext)