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
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  console.log(isLoggedIn);
  return (
    <div>
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
            <ExpenseForm />
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
