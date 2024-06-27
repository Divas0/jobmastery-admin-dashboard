import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  currentUser: {
    email: "",
    authorId: "",
    role: "",
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
      const {
        email = state.currentUser.email,
        authorId = state.currentUser.authorId,
        role = state.currentUser.role,
      } = action.payload;
      state.currentUser.email = email;
      state.currentUser.authorId = authorId;
      state.currentUser.role = role;
    },
  },
});

export const { updateCurrentUser, updateIsLoggedIn } = authSlice.actions;

export default authSlice.reducer;
