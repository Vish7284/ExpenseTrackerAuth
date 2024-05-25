import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";
import SignUp from "./Component/SignUp";
import SignIn from "./Component/SignIn";
import HomePage from "./Component/HomePage";
import UserProfileForm from "./Component/UserProfileForm";
import ForgetPassword from "./Component/ForgetPassword";
import ExpenseForm from "./Component/Expense/ExpenseForm";
import DisplayingExpense from "./Component/Expense/DisplayingExpense";
import { themeActions } from "./store/theme";

function App() {
 
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/Home");
    }
  }, [isLoggedIn, history]);



  return (
    <div className={darkMode ? "dark" : "light"}>
      {!isLoggedIn ? (
        <Switch>
          <Route path="/signIn" exact>
            <SignIn />
          </Route>
          <Route path="/signUp">
            <SignUp />
          </Route>
          <Route path="/forgotPassword">
            <ForgetPassword />
          </Route>
          <Redirect to="/signIn" />
        </Switch>
      ) : (
        <>
          <Route path="/Home">
            <HomePage />
           
            <DisplayingExpense />
          </Route>
          <Route path="/userdetail">
            <UserProfileForm />
          </Route>
          <Redirect to="/Home" />
        </>
      )}
    </div>
  );
}

export default App;
