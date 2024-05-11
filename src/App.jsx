import "./index.css";
import SignUp from "./Component/SignUp";
import SignIn from "./Component/SignIn";
import { useContext, useState } from "react";
import { Route } from "react-router-dom/cjs/react-router-dom";
import HomePage from "./Component/HomePage";
import ExpenseContext from "./store/expense-context";
import UserProfileForm from "./Component/UserProfileForm";
function App() {
  const ctx = useContext(ExpenseContext);

  return (
    <div>
      {!ctx.isLoggedIn && (
        <>
          <SignUp />
          <SignIn />
        </>
      )}
     {ctx.isLoggedIn && <>
        <Route path="/Home">
          <HomePage />
        </Route>
        <Route path="/userdetail">
          <UserProfileForm />
        </Route>
      </>}
    </div>
  );
}

export default App;
