import { userService } from "../services/userService.js";

const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsers();
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const users = await userService.deleteUser(req.params.id);
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const userController = {
    getUsers,
    deleteUser,
};
