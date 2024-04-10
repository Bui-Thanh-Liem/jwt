import jwt from "jsonwebtoken";
import { env } from "../config/environment.js";

// Check token valid
// decode the token
// attach token to req
const verifyToken = (req, res, next) => {
    const tokenUser = req.headers.token;
    if (tokenUser) {
        const accessToken = tokenUser.split(" ")[1]; // Bearer asdfasdfsadfasf.asdfasdf.sdfasd
        jwt.verify(accessToken, env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                return res
                    .status(403)
                    .json({ message: "Token is not valid !" });
            }
            req.currentUser = user;
            next();
        });
    } else {
        return res.status(401).json({ message: "Unauthorized !" });
    }
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.currentUser.id === req.params.id || req.currentUser.admin) {
            next();
        } else {
            return res
                .status(403)
                .json({ message: "You are not allowed to delete others." });
        }
    });
};

export const jwtMiddleWare = {
    verifyToken,
    verifyTokenAndAdmin,
};
