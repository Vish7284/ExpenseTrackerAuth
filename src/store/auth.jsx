import { createSlice } from "@reduxjs/toolkit";



const InitialAuthState = { isAuthenticated: false, token: "",userId:null };
const authSlice = createSlice({
  name: "auth",
  initialState: InitialAuthState,
  reducers: {
    logIn(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
      console.log("token aayega");
      state.userId = action.payload;
      console.log(state.token,"hoga ya nhi consol");
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