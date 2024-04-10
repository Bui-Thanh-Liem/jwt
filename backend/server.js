import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { database } from "./src/config/mongodb.js";
import { ROUTE_V1 } from "./src/routes/index.js";
import { errorHandlingMiddleware } from "./src/middlewares/errorHandlingMiddleware.js";
import { env } from "./src/config/environment.js";

const startServer = () => {
    const app = express();

    // Cors
    var whitelist = ["http://localhost:5173"];
    var corsOptions = {
        origin: function (origin, callback) {
            if (whitelist.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    };
    app.use(cors(corsOptions));

    // Cookies
    app.use(cookieParser());

    // Req.body
    app.use(express.json());

    app.use("/v1", ROUTE_V1);

    app.use(errorHandlingMiddleware);

    app.listen(env.PORT, () => {
        console.log(`Server listening at port ${env.PORT}`);
    });

    process.on("SIGINT", () => {
        database.disconnectDB();
    });
};

(async () => {
    try {
        await database.connectDB();
        startServer();
    } catch (error) {
        console.log(error);
        database.disconnectDB();
        process.exit(0);
    }
})();

// Authentication   -  Xác thực
// Authorization    -  Phân quyền
