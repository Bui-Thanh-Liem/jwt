import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import usersReducer from "./users/usersSlice.js";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export let persistor = persistStore(store)

export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./auth/authSlice.js";
// import usersReducer from "./users/usersSlice.js";

// const store = configureStore({
//     reducer: {
//         auth: authReducer,
//         users: usersReducer,
//     },
// });

// export default store;
