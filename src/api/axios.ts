import axios, { AxiosInstance } from 'axios';

// Define a type for the URL
type URL = string;

// Function to handle token refresh
const refreshToken = async () => {
    try {
        const response = await axios.get<{ accessToken: string }>(`${import.meta.env.VITE_APP_AUTH}/auth/refreshToken`, {
            withCredentials: true,
        });
        // Assuming the backend sets the new tokens in the cookies
        return response.data.accessToken;
    } catch (error) {
        // Handle refresh token failure (e.g., navigate to login or show an error message)
        throw new Error('Failed to refresh token');
    }
};

// Function to create an Axios instance with a given URL
const createAxiosInstance = (baseURL: URL): AxiosInstance => {
    const instance = axios.create({
        baseURL,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // // Response interceptor for handling token refresh
    // instance.interceptors.response.use(
    //     (response) => response,
    //     async (error) => {
    //         const originalRequest = error.config;

    //         if (
    //             error.response &&
    //             error.response.status === 403 &&
    //             error.response.data.message === "Unauthorized" &&
    //             !originalRequest._retry
    //         ) {
    //             originalRequest._retry = true;
    //             try {
    //                 await refreshToken();
    //                 return instance(originalRequest);
    //             } catch (refreshError) {
    //                 return Promise.reject(refreshError);
    //             }
    //         }

    //         return Promise.reject(error);
    //     }
    // );

    return instance;
};

// Create Axios instances with the URLs from environment variables
const authInstance = createAxiosInstance(import.meta.env.VITE_APP_AUTH as URL);
const chatInstance = createAxiosInstance(import.meta.env.VITE_APP_CHAT as URL);
const userInstance = createAxiosInstance(import.meta.env.VITE_APP_USER as URL);
const socketInstance = createAxiosInstance(import.meta.env.VITE_APP_SOCKET as URL);

export { authInstance, chatInstance, userInstance, socketInstance };
