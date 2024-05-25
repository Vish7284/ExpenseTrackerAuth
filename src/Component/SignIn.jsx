import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { authActions } from "../store/auth";
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
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAseaLTI7oj3WmCgxCwIrKgPDEvdsxxE8s",
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
    const cleanedEmail = data.email.replace(/[@.]/g , "");
  localStorage.setItem("cleanedEmail" ,JSON.stringify(cleanedEmail) )
 
   
    dispatch(authActions.logIn({token :data.idToken , userId : data.email}))

    setSignEmail("");
    setSignPass("");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div className="bg-cyan-200 p-10 text-black text-center mb-6 rounded-2xl">
          <h1 className="text text-center font-bold">Sign In</h1>
          <form onSubmit={signInFormSubmitHandler} className="w-full">
            <div className="text-start">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="bg-slate-50 m-4 rounded-lg w-full"
                value={signEmail}
                onChange={signInEmailHandler}
                required
              />
            </div>
            <div className="text-start">
              <label htmlFor="pass">Password</label>
              <input
                id="pass"
                type="password"
                className="bg-slate-50 m-4 rounded-lg w-full"
                value={signPass}
                onChange={signPassHndler}
                required
              />
            </div>
            <div className="mt-6">
              <button className="text-center rounded-xl bg-rose-300 hover:bg-rose-800 p-4 w-full">
                SignIn
              </button>
            </div>
            <div className="mt-10">
              <span className="bg-rose-200 rounded-3xl p-5 hover:bg-rose-500 ">
                <NavLink to="/forgotPassword">Forgot Password</NavLink>
              </span>
            </div>
          </form>
        </div>
        <div className="flex justify-center items-baseline bg-cyan-200 p-4 rounded-lg">
          <button>
            <NavLink to="/signUp">Didn't have An Account? Sign Up</NavLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
