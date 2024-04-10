import bcrypt from "bcrypt";
import User from "../models/User.js";
import TokenRefreshes from "../models/RefreshToken.js";

const register = async (data) => {
    try {
        // Check email, usrname exist already
        const userInDatabse = await User.findOne({
            $or: [{ email: data.email }, { username: data.username }],
        });
        if (userInDatabse) {
            if (userInDatabse.email === data.email)
                return { status: 200, message: "Email already exists !" };
            else return { status: 200, message: "Username already exists !" };
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(data.password, salt);

        // Create new user
        const newUser = new User({
            username: data.username,
            email: data.email,
            password: hashed,
        });

        // Save new user to databse
        const user = await newUser.save();
        return user;
    } catch (error) {
        throw error;
    }
};

const login = async (reqBody) => {
    try {
        // Check username exists
        const user = await User.findOne({ username: reqBody.username });

        // Not found
        if (!user) {
            return { message: "Username not found !" };
        }

        // Found username
        const isValidPassword = await bcrypt.compare(
            reqBody.password,
            user.password
        );

        // Check password
        if (!isValidPassword) {
            return { message: "Invalid password !" };
        }

        // Success login
        if (user && isValidPassword) {
            const { password, ...restUser } = user._doc;
            return restUser;
        }
    } catch (error) {
        throw error;
    }
};

const addToken = async (token) => {
    try {
        const tokenNew = new TokenRefreshes({ refreshToken: token });
        return await tokenNew.save();
    } catch (error) {
        throw error;
    }
};

const deleteToken = async (refreshToken) => {
    try {
        const resultDelete = await TokenRefreshes.deleteOne({
            refreshToken: refreshToken,
        });
        return resultDelete;
    } catch (error) {
        throw error;
    }
};

const checkRefreshToken = async (token) => {
    try {
        const currentRefreshToken = await TokenRefreshes.findOne({
            refreshToken: token,
        });
        return currentRefreshToken;
    } catch (error) {
        throw error;
    }
};

export const authService = {
    register,
    login,
    addToken,
    deleteToken,
    checkRefreshToken,
};
