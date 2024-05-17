import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth";
import ExpensesReducer from "./expenses";


const store = configureStore({
    reducer:{auth:AuthReducer , expenses:ExpensesReducer}
})


export default store;