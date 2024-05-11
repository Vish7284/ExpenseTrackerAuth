import React from "react";

const ExpenseContext = React.createContext({
  token:"",
  isLoggedIn:false,
   logIn:(token)=>{},
   logOut:()=>{},
})

export default ExpenseContext;