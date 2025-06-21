import { createContext, useContext, useEffect, useState } from 'react';
import api from '../apiClient.js';
import { BASE_URL, endpoints } from '../../settings.js';
import { clearAuthTokens, isLoggedIn, setAuthTokens } from 'axios-jwt';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  let isMounted = true;
  setLoading(true);

  (async () => {
    try {
      if (!(await isLoggedIn())) {
        if (isMounted) setUser(null);
      } else {
        const { data: userData } = await api.get(endpoints.user);
        if (isMounted) setUser(userData);
      }
    } catch (error) {
      await clearAuthTokens();
      if (isMounted) setUser(null);
    } finally {
      if (isMounted) setLoading(false);
    }
  })();

  return () => {
    isMounted = false;
  };
}, []);


  const login = async (email, password) => {
    try {
      const { data } = await api.post(endpoints.login, { email, password });
      await setAuthTokens({
        accessToken: data.access,
        refreshToken: data.refresh,
      });

      const { data: userData } = await api.get(endpoints.user);
      console.log(`Fetching user with: ${BASE_URL}${endpoints.user}`);
      setUser(userData);
      return true;
    } catch (error) {
      console.log('The user could not be authenticated.', error);
      return false;
    }
  };

  const logout = async () => {
    await clearAuthTokens();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ login, user, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => useContext(UserContext);
