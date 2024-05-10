import { useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

const SignIn = () => {
  const [signEmail, setSignEmail] = useState("");
  const [signPass, setSignPass] = useState("");


  const signInEmailHandler =(e)=>{
    setSignEmail(e.target.value)
  }

  const signPassHndler =(e)=>{
setSignPass(e.target.value)
  }
  const signInFormSubmitHandler = async(e) => {
    e.preventDefault();
    const signInData = {
      signEmail: signEmail,
      signPass: signPass,
    };

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8idrG0OBLxrDZD1cJhoo2Z2VVhsnEFYc",{
        method:'POST',
        body:JSON.stringify({
            email:signEmail,
            password:signPass,
            returnSecureToken:true,
        }),
        headers:{
            "Content-Type":"application/json",
        }
      }
    );
    if(!response.ok){
        const errorData = response.json();
        throw new Error("Sign In Response not good",errorData.error.message)
    }

    const data = await response.json();
    console.log(data.idToken);
    console.log("UserLogged in");

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

          <button className="text-center rounded-xl bg-rose-300 hover:bg-rose-800 p-4">
           <NavLink to="/Home">SignIn</NavLink>
          </button>
        </form>
      </div>
      <div className="flex justify-center items-baseline bg-cyan-200 p-4 rounded-lg">
        <button>Didn't have An Account? Sign Up</button>
      </div>
    </div>
  );
};

export default SignIn;
