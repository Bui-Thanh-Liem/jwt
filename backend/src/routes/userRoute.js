import express from "express";

import { jwtMiddleWare } from "../middlewares/jwtMiddleWare.js";
import { userController } from "../controllers/userController.js";

const router = express.Router();

router
    .route("/")
    .get(jwtMiddleWare.verifyToken, userController.getUsers)

router
    .route("/:id")
    .delete(jwtMiddleWare.verifyTokenAndAdmin, userController.deleteUser);

export const userRoute = router;
