
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import { themeActions } from "../store/theme";
const HomePage = () => {
var token = useSelector(state => state.auth.token);
// console.log(token);
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.theme.darkMode);


  const themeChangeHandler =()=>{
    dispatch(themeActions.themeChanger())
  }

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
    localStorage.removeItem("cleanedEmail")
  }
  return (
    <div
      className={`p-2 rounded ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <div className="flex justify-between w-full">
        <header className="flex justify-evenly items-center">
          <span className="font-bold font-serif">Welcome to the Home page</span>
            <span className="pl-96">
              <button
                className={`p-2 rounded ${
                  darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
                }`}
                onClick={themeChangeHandler}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  />
                </svg>
              </button>
            </span>
            <NavLink to="/userdetail" className="font-bold ">
              Complete User Details
            </NavLink>
        </header>
        <div>
          <button
            className="bg-purple-300 hover:bg-purple-600 rounded-lg p-3"
            onClick={verifyEmailHandler}
          >
            Verify Email
          </button>
          <button
            className="bg-rose-200 hover:bg-rose-700 rounded-lg p-2 ml-4"
            onClick={logOutHanlderHome}
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
