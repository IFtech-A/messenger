import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      const user  = action.payload;
      console.log("LOGIN", {
        state,
        action,
      });
      state.user = {...user, avatar: null};
    },
    logout(state, action) {
      console.log("LOGOUT", {
        state,
        action,
      });
      state.user = null;
    },
    signUp(state, action) {
      console.log("SIGNUP", {
        state,
        action,
      });
    },
  },
});

export const { login, logout,signUp } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer