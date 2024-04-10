import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { refreshTokenAPI } from "../apis/index.js";
import { refreshToken_login } from "../redux/auth/authSlice.js";

export const interCepTors_axios = (accessToken, dispatch) => {
    const axiosJwt = axios.create();
    axiosJwt.interceptors.request.use(
        async (config) => {
            let date = new Date().getTime();
            const dataOfAccessToken = jwtDecode(accessToken);
            if (dataOfAccessToken.exp < date / 1000) {
                const { accessToken } = await refreshTokenAPI();
                dispatch(refreshToken_login(accessToken));
                config.headers["token"] = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    return axiosJwt;
};
