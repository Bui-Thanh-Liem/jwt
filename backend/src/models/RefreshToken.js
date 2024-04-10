import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    refreshToken: {
        type: String
    },
});

export default mongoose.model('TokenRefreshes', tokenSchema);


