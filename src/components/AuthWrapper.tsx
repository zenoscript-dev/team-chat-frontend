// AuthWrapper.tsx
import { authInstance, chatInstance, socketInstance, userInstance } from "@/api/axios";
import React, { useEffect, useLayoutEffect, ReactNode, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { io, Socket } from "socket.io-client";

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, setToken } = useAuth();
  const socket = useRef<Socket | null>(null);
  console.log(token);

  useEffect(() => {
    if (!token) {
      (async () => {
        try {
          const response = await authInstance.get<{ accessToken?: string, userId: string }>("auth/me");
          if (response.data.accessToken) {
            await localStorage.setItem("userId", response.data.accessToken);
            await setToken(response.data.userId);
          } else {
            setToken(null);
            navigate("/login");
          }
        } catch (error: unknown) {
          if (error instanceof Error && "response" in error && (error as any).response?.status === 401) {
            setToken(null);
            navigate("/login");
          }
        }
      })();
    } else if (location.pathname === "/login") {
      navigate("/");
    }
  }, [token, navigate, setToken]);

  useLayoutEffect(() => {
    const authInterceptor = authInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const chatInterceptor = chatInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const userInterceptor = userInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const socketInterceptor = socketInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      authInstance.interceptors.request.eject(authInterceptor);
      chatInstance.interceptors.request.eject(chatInterceptor);
      userInstance.interceptors.request.eject(userInterceptor);
      socketInstance.interceptors.request.eject(socketInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = authInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response &&
          error.response.status === 403 &&
          error.response.data.message === "Unauthorized" &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const response = await authInstance.get<{ accessToken: string }>("auth/refreshToken");
            setToken(response.data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return authInstance(originalRequest);
          } catch (refreshError) {
            setToken(null);
            navigate("/login");
          }
        }
        return Promise.reject(error);
      }
    );
    const chatInterceptor = chatInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response &&
          error.response.status === 403 &&
          error.response.data.message === "Unauthorized" &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const response = await authInstance.get<{ accessToken: string }>("auth/refreshToken");
            setToken(response.data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return chatInstance(originalRequest);
          } catch (refreshError) {
            setToken(null);
            navigate("/login");
          }
        }
        return Promise.reject(error);
      }
    );
    const userInterceptor = userInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response &&
          error.response.status === 403 &&
          error.response.data.message === "Unauthorized" &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const response = await authInstance.get<{ accessToken: string }>("auth/refreshToken");
            setToken(response.data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return userInstance(originalRequest);
          } catch (refreshError) {
            setToken(null);
            navigate("/login");
          }
        }
        return Promise.reject(error);
      }
    );
    const socketInterceptor = socketInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response &&
          error.response.status === 403 &&
          error.response.data.message === "Unauthorized" &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const response = await authInstance.get<{ accessToken: string }>("auth/refreshToken");
            setToken(response.data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return socketInstance(originalRequest);
          } catch (refreshError) {
            setToken(null);
            navigate("/login");
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      authInstance.interceptors.response.eject(refreshInterceptor);
      chatInstance.interceptors.response.eject(chatInterceptor);
      userInstance.interceptors.response.eject(userInterceptor);
      socketInstance.interceptors.response.eject(socketInterceptor);
    };
  }, [token, navigate, setToken]);

  return <>{children}</>;
};

export default AuthWrapper;
