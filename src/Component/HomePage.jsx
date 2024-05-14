import { useContext } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import ExpenseContext from "../store/expense-context";

const HomePage = () => {
  const ctx = useContext(ExpenseContext);

  const verifyEmailHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC8idrG0OBLxrDZD1cJhoo2Z2VVhsnEFYc",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: ctx.token,
          }),
        }
      );

      if (!response.ok) {
        const errDat = await response.json();
        throw new Error("nhi bhejenge verify email kya....");
      }
      const data = await response.json();
      console.log(data.email);
    } catch (err) {
      console.log(err);
    }
  };

  const logOutHnalderHome =()=>{
    ctx.logOut()
  }
  return (
    <div className="bg-orange-200 flex justify-between items-center px-4 py-2">
      <header className="flex justify-between w-full">
        <span>Welcome to the Home page</span>
        <span>
          <NavLink to="/userdetail" className="font-bold">
            Complete User Details
          </NavLink>
        </span>
      </header>
      <main>
        <div >
          <button
            className="bg-purple-300 hover:bg-purple-600 rounded-lg p-3"
            onClick={verifyEmailHandler}
          >
            Verify Email
          </button>
        </div>
        <div>
          <button
            className="bg-rose-200 hover:bg-rose-700 rounded-lg p-2"
            onClick={logOutHnalderHome}
          >
            LogOut
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
