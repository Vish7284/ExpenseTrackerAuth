import "./index.css";
import SignUp from "./Component/SignUp";
import SignIn from "./Component/SignIn";
import { useContext } from "react";
import { Route } from "react-router-dom/cjs/react-router-dom";
import HomePage from "./Component/HomePage";
import ExpenseContext from "./store/expense-context";
import UserProfileForm from "./Component/UserProfileForm";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import ForgetPassword from "./Component/ForgetPassword";
function App() {
  const ctx = useContext(ExpenseContext);

  return (
    <div>
      {!ctx.isLoggedIn ? (
        <>
          <SignUp />
          <SignIn />
        </>
      ) : (
        <>
          <Redirect to="/Home" />
          <Route path="/Home">
            <HomePage />
          </Route>
          <Route path="/userdetail">
            <UserProfileForm />
          </Route>
        </>
      )}
      <Route path="/forgotPassword">
        <ForgetPassword />
      </Route>
    </div>
  );
}

export default App;
