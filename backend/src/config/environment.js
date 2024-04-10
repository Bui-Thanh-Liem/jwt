import "dotenv/config";

export const env = {
    PORT: process.env.PORT,
    LOCAL_HOST: process.env.LOCAL_HOST,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_ACCESS_KEY: process.env.JWT_ACCESS_KEY,
    JWT_REFRESH_KEY: process.env.JWT_REFRESH_KEY,
}