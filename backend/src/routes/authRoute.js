import express from "express";

import { authController } from "../controllers/authController.js";
import { authValidation } from "../validations/authValidation.js";
import { jwtMiddleWare } from '../middlewares/jwtMiddleWare.js';

const authRouter = express.Router();

authRouter
    .route("/register")
    .post(authValidation.register, authController.register);

authRouter
    .route("/login")
    .post(authValidation.login, authController.login);

authRouter
    .route("/logout")
    .post(jwtMiddleWare.verifyToken, authController.logout);

authRouter
    .route("/refresh")
    .post(authController.requestRefreshToken);

export { authRouter };
