import { useState } from "react";
import ExpenseContext from "./expense-context";

const ExpenseContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logInHandler = () => {
    setIsLoggedIn((prev) => !prev);
  };

  const value = {
    logIn: isLoggedIn,
    isLogIn: logInHandler,
  };
  return (
    <ExpenseContext.Provider value={value}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
export default ExpenseContextProvider;
