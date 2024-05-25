import { createSlice } from "@reduxjs/toolkit";

var InitialAuthState = { isAuthenticated: false, token: "", userId: null };
const authSlice = createSlice({
  name: "auth",
  initialState: InitialAuthState,
  reducers: {
    logIn(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      console.log(state.userId ,"from login reducer function");
    },
    logOut(state) {
      state.isAuthenticated = false;
      state.token = "";
      state.userId = null;
    },
    
  },
  
});

export const authActions = authSlice.actions;

export default authSlice.reducer
