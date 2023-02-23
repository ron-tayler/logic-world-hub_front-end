import axios, { AxiosRequestConfig } from "axios";

// @ts-ignore
const server_api_url = import.meta.env.VITE_SERVER_API_URL;

const defaultConfig: AxiosRequestConfig = {
    baseURL: server_api_url,
    headers: {
        "Content-Type": "application/json",
    },
};

const loginConfig: AxiosRequestConfig = {
    baseURL: server_api_url,
    headers: {
        "Content-Type": "application/json",
    },
};

export const DefaultAPIInstance = axios.create(defaultConfig);
export const LoginAPIInstance = axios.create(loginConfig);
