import "./index.css";
import SignUp from "./Component/SignUp";
import SignIn from "./Component/SignIn";
import { useContext, useState } from "react";
import { Route } from "react-router-dom/cjs/react-router-dom";
import HomePage from "./Component/HomePage";
import ExpenseContext from "./store/expense-context";
function App() {
  const ctx = useContext(ExpenseContext)
  

  return (
    <div>
      {!ctx.logIn &&
        <>
          <SignUp />
          <SignIn />
        </>
      }
      {ctx.logIn && (
        <Route path="/Home">
          <HomePage />
        </Route>
      )}
    </div>
  );
}

export default App;
