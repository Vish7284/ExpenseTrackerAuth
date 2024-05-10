import { useState } from "react";

const Input = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [conPass, setConPass] = useState("");
  const [passMatch, setPassMatch] = useState(false);

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPass(e.target.value);
  };

  const conPassChangeHandler = (e) => {
    setConPass(e.target.value);
    if (e.target.value === pass) {
      setPassMatch(true);
    } else {
      setPassMatch(false);
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const obj = {
      email: email,
      pass: pass,
    };

    console.log(obj);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8idrG0OBLxrDZD1cJhoo2Z2VVhsnEFYc",{
        method:"POST",
        body:JSON.stringify({
          email:email,
          password:pass,
          returnSecureToken:true,
        }),
        headers:{
          "Content-Type":"application/json"
        }
      }).then((res)=>{
        if(res.ok){
          return res.json()
        }else{
          return res.json().then((data)=>{
            throw new Error("Data not saved to the firebase")
          })
        }
      }).then((data)=>{
        console.log(data.email);
        console.log("User SuccesFully Registered");
      }).catch(err => console.log(err));
    setEmail("");
    setPass("");
    setConPass("");
    setPassMatch(false);
  };
  return (
    <div className="flex flex-col items-center w-screen">
      <div className="bg-cyan-200 p-10 text-black text-center mb-6">
        <h1 className="text text-center font-bold">Sign Up</h1>
        <form onSubmit={formSubmitHandler} className="w-full">
          <div className="text-center">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="bg-slate-50 m-4 rounded-lg"
              value={email}
              onChange={emailChangeHandler}
              required
            />
          </div>
          <div className="text-center">
            <label htmlFor="pass">Password</label>
            <input
              id="pass"
              type="password"
              className="bg-slate-50 m-4 rounded-lg"
              value={pass}
              onChange={passwordChangeHandler}
              required
            />
          </div>
          <div className="text-center">
            <label htmlFor="conPass">Confirm Password</label>
            <input
              id="conPass"
              type="password"
              className="bg-slate-50 m-4 rounded-lg"
              value={conPass}
              onChange={conPassChangeHandler}
              required
            />{" "}
            {passMatch && <p>Passwords match!</p>}
            {!passMatch && conPass.length > 0 && <p>Passwords do not match!</p>}
          </div>
          <button className="text-center rounded-xl bg-rose-300 hover:bg-rose-800 p-4">
            Sign Up
          </button>
        </form>
      </div>
      <div className="flex justify-center items-baseline bg-cyan-200 p-4 rounded-lg">
        <button>Have An Account? Login</button>
      </div>
    </div>
  );
};

export default Input;
