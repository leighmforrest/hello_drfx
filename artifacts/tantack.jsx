// src/contexts/UserContext.jsx
import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    clearAuthTokens,
    isLoggedIn,
    setAuthTokens,
} from "axios-jwt";

import api from "../apiClient.js";
import { endpoints } from "../../settings.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading: loading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () =>
      (await isLoggedIn())
        ? (await api.get(endpoints.user)).data
        : null,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const { data } = await api.post(endpoints.login, data);
      await setAuthTokens({
        accessToken: data.access,
        refreshToken: data.refresh,
      });
      const { data: userData } = await api.get(endpoints.user);
      return userData;
    },
    onSuccess: (userData) => {
      queryClient.setQueryData(["user"], userData);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
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
    queryClient.setQueryData(["user"], null);
  };

  return (
    <UserContext.Provider value={{ login, logout, user, loading, refetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
