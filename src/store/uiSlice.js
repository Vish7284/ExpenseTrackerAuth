import { createSlice } from "@reduxjs/toolkit";

const InitialUIState = { notification: null };
const UISlice = createSlice({
  name: "UI",
  initialState: InitialUIState,
  reducers: {
    showNotification(state, action) {
        state.notification = {
            status : action.payload.status,
            title:action.payload.title,
            message : action.payload.message,
        }
    },
  },
});

export const UIActions = UISlice.actions;
export default UISlice.reducer;
