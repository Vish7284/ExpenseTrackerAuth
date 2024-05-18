import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth";
import ExpensesReducer from "./expenses";
import ThemeReducer from './theme';


const store = configureStore({
    reducer:{auth:AuthReducer , expenses:ExpensesReducer , theme:ThemeReducer}
})


export default store;