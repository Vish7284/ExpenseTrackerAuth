import React from "react";

const ExpenseContext = React.createContext({
  expenses: [],
  token: "",
  isLoggedIn: false,
  logIn: (token) => {},
  logOut: () => {},
  addExpense: (expense) => {},
  deleteExpense: (expenseId) => {},
  editExpense:(expenseId)=>{},
  updateExpense:(expenseId)=>{},
  moneyChangeHandler: () => {},
  desChangeHandler: () => {},
  catChangeHandler: () => {},
  addingExpenseFormHandler:()=>{},
});

export default ExpenseContext;