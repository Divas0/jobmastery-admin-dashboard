import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  currentUser: {
    email: "",
    password: "",
    username: "",
    authorId: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    updateCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { updateCurrentUser, updateIsLoggedIn } = authSlice.actions;

export default authSlice.reducer;
