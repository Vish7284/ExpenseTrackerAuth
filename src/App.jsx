import "./index.css";
import SignUp from "./Component/SignUp";
import SignIn from "./Component/SignIn";
import { Route } from "react-router-dom/cjs/react-router-dom";
import HomePage from "./Component/HomePage";

import UserProfileForm from "./Component/UserProfileForm";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import ForgetPassword from "./Component/ForgetPassword";
import ExpenseForm from "./Component/Expense/ExpenseForm";
import DisplayingExpense from "./Component/Expense/DisplayingExpense";
import { useSelector } from "react-redux";
import { useState } from "react";
import { themeActions } from "./store/theme";
function App() {

  const [openForm ,setOpenForm] = useState(false)
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  console.log(isLoggedIn);
  const addExpenseHandler = ()=>{
    setOpenForm(true)
  }

   const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <div className={darkMode ? "dark" : "light"}>
      {!isLoggedIn ? (
        <>
          <SignUp />
          <SignIn />
        </>
      ) : (
        <>
          <Redirect to="/Home" />
          <Route path="/Home">
            <HomePage />
            <div className="flex justify-center items-center w-screen ">
              {!openForm ? (
                <button
                  className="bg-purple-300 hover:bg-purple-500 rounded-3xl p-5  m-5"
                  onClick={addExpenseHandler}
                >
                  Add New Expense Here
                </button>
              ) : (
                <ExpenseForm props={openForm} />
              )}
            </div>

            <DisplayingExpense />
          </Route>
          <Route path="/userdetail">
            <UserProfileForm />
          </Route>
        </>
      )}
      {!isLoggedIn && (
        <Route path="/forgotPassword">
          <ForgetPassword />
        </Route>
      )}
    </div>
  );
}

export default App;
