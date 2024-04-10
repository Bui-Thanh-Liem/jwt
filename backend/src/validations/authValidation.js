import Joi from "joi";

const register = async (req, res, next) => {
    const userSchema = Joi.object({
        username: Joi.string().required().min(6).max(20).trim().strict(),
        email: Joi.string().required().min(10).max(50).email().trim().strict(),
        password: Joi.string().required().min(6),
    });

    try {
        await userSchema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().required().min(6).max(20).trim().strict(),
        password: Joi.string().required().min(6),
    });

    try {
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        next(error);
    }
};

export const authValidation = {
    register,
    login,
};
