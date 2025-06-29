/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import api from '../apiClient.js';
import { endpoints } from '../../settings.js';
import { clearAuthTokens, isLoggedIn, setAuthTokens } from 'axios-jwt';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading: loading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (!(await isLoggedIn())) return null;

      try {
        const { data } = await api.get(endpoints.user);
        return data;
      } catch (error) {
        if (error?.response?.status === 401) {
          await logout();
        }
        throw error;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const { data: tokens } = await api.post(endpoints.login, data);
      await setAuthTokens({
        accessToken: tokens.access,
        refreshToken: tokens.refresh,
      });

      const { data: userData } = await api.get(endpoints.user);
      return userData;
    },
    onSuccess: (userData) => queryClient.setQueryData(['user'], userData),
    onError: (error) => console.log('Login failed', error),
  });

  const login = async (email, password) => {
    try {
      await loginMutation.mutateAsync({ email, password });
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    await clearAuthTokens();
    queryClient.setQueryData(['user'], null);
  };

  return (
    <UserContext.Provider value={{ login, user, logout, loading, refetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => useContext(UserContext);
