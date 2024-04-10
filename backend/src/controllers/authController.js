import jwt from "jsonwebtoken";

import { env } from "../config/environment.js";
import { authService } from "../services/authService.js";

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id || user.id, admin: user.admin },
        env.JWT_ACCESS_KEY,
        {
            expiresIn: "30s",
        }
    ); // asdfasdfasdfad.sdfsadfasdf.asdfasdfasd
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id, admin: user.admin }, env.JWT_REFRESH_KEY, {
        expiresIn: "1d",
    }); // asdfasdfasdfad.sdfsadfasdf.asdfasdfasd
};

const requestRefreshToken = async (req, res, next) => {
    try {
        const refreshTokenFromClient = req.cookies.refreshToken;

        // Check login
        if (!refreshTokenFromClient)
            return res.status(401).json("You are not authenticated !");

        // Check refresh token youself (When you login, app save token on database)
        const checkRefreshToken = await authService.checkRefreshToken(
            refreshTokenFromClient
        );
        if (!checkRefreshToken)
            return res.status(401).json("Token is not exists !");

        // Check valid and generate new access token
        jwt.verify(refreshTokenFromClient, env.JWT_REFRESH_KEY, (err, user) => {
            if (err) next(err);
            const newAccessToken = generateAccessToken(user);
            return res.status(200).json({ accessToken: newAccessToken });
        });
    } catch (error) {
        next(error);
    }
};

const register = async (req, res, next) => {
    try {
        // Nhận tham số truyền và truyền đi
        const newUser = await authService.register(req.body);
        res.json(newUser);
    } catch (error) {
        next(error);
    }
};

const login = async (req, res) => {
    try {
        const resultLogin = await authService.login(req.body);

        if (!resultLogin._id) {
            return res.status(401).json(resultLogin);
        }

        // Create token
        const accessToken = generateAccessToken(resultLogin);
        const refreshToken = generateRefreshToken(resultLogin);

        // Save refresh token for frontend
        res.cookie("refreshToken", refreshToken, {
            path: "/",
            secure: false,
            // secure: true,
            httpOnly: true,
            sameSite: "strict",
        });

        // Save refresh token for backend
        await authService.addToken(refreshToken);

        res.status(200).json({ ...resultLogin, accessToken });
    } catch (error) {
        throw error;
    }
};

const logout = async (req, res, next) => {
    try {
        await authService.deleteToken(req.cookies.refreshToken);
        res.clearCookie("refreshToken");
        res.status(200).json("Logout successful !");
    } catch (error) {
        next(error);
    }
};

export const authController = {
    register,
    login,
    logout,
    requestRefreshToken,
};
