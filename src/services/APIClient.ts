export const API_URL = 'https://estable.dev/api';
import axios, { AxiosError, AxiosResponse } from 'axios';

const createAxiosInstance = (baseURL: string) => {
  const axiosInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
    auth: {
      // TODO: These credentials should be moved to environment variables
      // For this technical challenge, credentials are hardcoded for simplicity
      username: 'WelComeToEst',
      password: 'GudLuck@2025',
    },
  });

  // Response interceptor for error handling
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const axiosInstance = createAxiosInstance(API_URL);
