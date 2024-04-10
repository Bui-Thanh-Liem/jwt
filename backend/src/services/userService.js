import User from "../models/User.js";

const getUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        await User.findOneAndDelete({ _id: id });
        const usersListNew = await User.find({ _id: { $ne: id } });
        return usersListNew;
    } catch (error) {
        throw error;
    }
};

export const userService = {
    getUsers,
    deleteUser,
};
