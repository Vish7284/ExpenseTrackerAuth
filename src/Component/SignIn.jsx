import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import  { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
const SignIn = () => {
  const [signEmail, setSignEmail] = useState("");
  const [signPass, setSignPass] = useState("");

  const dispatch = useDispatch();
   var localToken = localStorage.getItem("token");

 useEffect(() => {
  
   if (localToken) {
     dispatch(authActions.logIn(JSON.parse(localToken)));
   }
 }, [localToken]);
  const signInEmailHandler = (e) => {
    setSignEmail(e.target.value);
  };

  const signPassHndler = (e) => {
    setSignPass(e.target.value);
  };
  const signInFormSubmitHandler = async (e) => {
    e.preventDefault();
    const signInData = {
      signEmail: signEmail,
      signPass: signPass,
    };
    console.log(signInData);
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8idrG0OBLxrDZD1cJhoo2Z2VVhsnEFYc",
      {
        method: "POST",
        body: JSON.stringify({
          email: signEmail,
          password: signPass,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("Sign In Response not good", errorData.error.message);
    }

    const data = await response.json();
    localStorage.setItem("token", JSON.stringify(data.idToken));
    if (data && data.alertMessage) {
      alert(data.alertMessage); // Display the alert message
    }
    console.log(data);
    // localStorage.setItem("token", JSON.stringify(data.idToken))
    // ctx.logIn(data.idToken)
    const localToken = localStorage.getItem("token");
    dispatch(authActions.logIn(localToken));

    setSignEmail("");
    setSignPass("");
  };

  return (
    <div className="flex flex-col items-center w-screen">
      <div className="bg-cyan-200 p-10 text-black text-center mb-6">
        <h1 className="text text-center font-bold">Sign In</h1>
        <form onSubmit={signInFormSubmitHandler} className="w-full">
          <div className="text-center">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="bg-slate-50 m-4 rounded-lg"
              value={signEmail}
              onChange={signInEmailHandler}
              required
            />
          </div>
          <div className="text-center">
            <label htmlFor="pass">Password</label>
            <input
              id="pass"
              type="password"
              className="bg-slate-50 m-4 rounded-lg"
              value={signPass}
              onChange={signPassHndler}
              required
            />
          </div>
          <div className="flex justify-between items-baseline">
            <button className="text-center rounded-xl bg-rose-300 hover:bg-rose-800 p-4">
              SignIn
            </button>
            <span className="bg-rose-200 rounded-3xl p-5 hover:bg-rose-500">
              <NavLink to="/forgotPassword">Forgot Password</NavLink>
            </span>
          </div>
        </form>
      </div>
      <div className="flex justify-center items-baseline bg-cyan-200 p-4 rounded-lg">
        <button>Didn't have An Account? Sign Up</button>
      </div>
    </div>
  );
};

export default SignIn;
