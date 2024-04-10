import { fetchAllUsers, deleteUser } from "./usersThunk.js";

import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: {
            isPending: false,
            error: false,
            allUsers: null,
        },
        deleteUser: {
            error: false,
            isPending: false,
            message: "",
        },
    },
    reducers: {},
    extraReducers: (builder) => {
        // Fetch
        builder.addCase(fetchAllUsers.pending, (state) => {
            state.users.isPending = true;
        });
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.users.isPending = false;
            state.users.allUsers = action.payload;
        });
        builder.addCase(fetchAllUsers.rejected, (state) => {
            state.users.isPending = false;
            state.users.error = true;
        });

        // Delete user
        builder.addCase(deleteUser.pending, (state) => {
            state.deleteUser.isPending = true;
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.deleteUser.isPending = false;
            state.users.allUsers = action.payload;
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.deleteUser.isPending = false;
            state.deleteUser.message = action.payload?.message;
            state.deleteUser.error = true;
        });
    },
});

export default usersSlice.reducer;
