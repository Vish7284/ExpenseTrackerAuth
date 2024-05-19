import { createSlice } from "@reduxjs/toolkit";

const InitialCartState = {isShow : false};

const cartSlice = createSlice({
    name:"cart",
    initialState:InitialCartState,
    reducers : {
        setShow(state ,action){
            state.isShow = !state.isShow;
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;