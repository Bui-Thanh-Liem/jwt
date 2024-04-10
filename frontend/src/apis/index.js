import axios from "axios";
import { interCepTors_axios } from "../config/axiosInstance.js";

axios.defaults.withCredentials = true;

const axios_allowCookie = axios.create({ withCredentials: true });

export const fetchAllUsersAPI = async (token) => {
    const users = await axios.get(
        `http://${import.meta.env.VITE_APP_ROOT}/v1/users`,
        {
            headers: {
                token: `Bearer ${token}`,
            },
        }
    );
    return users.data;
};

export const deleteUserAPI = async (id, token, dispatch) => {
    const jwtAxios = interCepTors_axios(token, dispatch);
    const listUserNew = await jwtAxios.delete(
        `http://${import.meta.env.VITE_APP_ROOT}/v1/users/${id}`,
        {
            headers: {
                token: `Bearer ${token}`,
            },
        }
    );
    return listUserNew.data;
};

export const registerAPI = async (user) => {
    const userRegistered = await axios.post(
        `http://${import.meta.env.VITE_APP_ROOT}/v1/auth/register`,
        user
    );
    return userRegistered.data;
};

export const loginAPI = async (user) => {
    const newUser = await axios_allowCookie.post(
        `http://${import.meta.env.VITE_APP_ROOT}/v1/auth/login`,
        user
    );
    return newUser.data;
};

export const logoutAPI = async (token, dispatch) => {
    const jwtAxios = interCepTors_axios(token, dispatch);
    await jwtAxios.post(
        `http://${import.meta.env.VITE_APP_ROOT}/v1/auth/logout`,
        null,
        {
            headers: {
                token: `Bearer ${token}`,
            },
        }
    );
};

export const refreshTokenAPI = async () => {
    const newAccessToken = await axios_allowCookie.post(
        `http://${import.meta.env.VITE_APP_ROOT}/v1/auth/refresh`
    );
    return newAccessToken.data;
};
