import { createSlice } from "@reduxjs/toolkit";

const InitialState = {darkMode : false};

const themeSlice = createSlice({
    name :"theme",
    initialState:InitialState,
    reducers :{
        themeChanger(state,action){
state.darkMode = !state.darkMode;
        }
    }
})

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
