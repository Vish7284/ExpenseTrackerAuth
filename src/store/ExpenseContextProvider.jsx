import { useState } from "react";
import ExpenseContext from "./expense-context";

const ExpenseContextProvider = (props) => {
  const localToken = JSON.parse(localStorage.getItem("token"))
const [token ,setToken] = useState(localToken)
  const userIsLoggedIn = !!(token)
  const logInHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", JSON.stringify(token));
  };
  const value = {
    token:token,
    logIn: logInHandler,
    isLoggedIn: userIsLoggedIn,
  };
  return (
    <ExpenseContext.Provider value={value}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
export default ExpenseContextProvider;
