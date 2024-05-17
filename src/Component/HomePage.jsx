
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
const HomePage = () => {
var token = useSelector(state => state.auth.token);
console.log(token);
  const dispatch = useDispatch();

  const verifyEmailHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC8idrG0OBLxrDZD1cJhoo2Z2VVhsnEFYc",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(
          `Error:Nhi send hua verification mail`,errData
        );
      }

      const data = await response.json();
      console.log("Email verification sent successfully:", data);
    } catch (err) {
      console.log("Failed to send email verification:", err.message);
    }
  };


  const logOutHanlderHome =()=>{
    dispatch(authActions.logOut());
    localStorage.removeItem("token");
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
            onClick={logOutHanlderHome}
          >
            LogOut
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
