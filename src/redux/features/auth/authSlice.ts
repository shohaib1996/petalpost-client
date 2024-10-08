import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  id: string;
  email: string;
  role: string;
  name: string;
  avatar: string;
  iat: number;
  exp: number;
};

type TAuth = {
  user: null | TUser;
  token: null | string;
};

const initialState: TAuth = {
  user: null,
  token: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
    //   console.log(action.payload, "payload");
      state.user = user;
      state.token = token;
    },
    Logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, Logout } = authSlice.actions;

export default authSlice.reducer;
