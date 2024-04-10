import mongoose from "mongoose";
import "dotenv/config";


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connect database successfully !");
    } catch (error) {
        console.log(error);
    }
}

async function disconnectDB() {
    console.log('Disconnect database !');
    await mongoose.disconnect();
}

function getDB() {
    return mongoose.model('User');
}

export const database = {
    connectDB,
    disconnectDB,
    getDB,
};
