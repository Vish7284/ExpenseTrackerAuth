import React from "react";

const ExpenseContext = React.createContext({
  expenses:[],
  token:"",
  isLoggedIn:false,
   logIn:(token)=>{},
   logOut:()=>{},
   addExpense:(expense)=>{},
})

export default ExpenseContext;