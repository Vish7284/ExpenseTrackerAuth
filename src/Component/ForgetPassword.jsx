import { useState } from "react";

const ForgetPassword = () => {
  const [email1, setEmail1] = useState("");
  const [resetPass, setResetPass] = useState("");

  const emailChangeHanler = (e) => {
    setEmail1(e.target.value);
  };
  const resetPassChangeHandler = (e) => {
    setResetPass(e.target.value);
  };

  const resetFormHandler = async(e) => {
    e.preventDefault();
    const forgetData = {
        email1:email1,
        resetPass:resetPass,
    }
    console.log(forgetData);
   try {
     const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC8idrG0OBLxrDZD1cJhoo2Z2VVhsnEFYc",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email1,
        }),
        headers:{
            "Content-Type": "application/json"
        }
      }
    );
    if(!response.ok){
        const errDaata = await response.json();
        throw new Error("ku6 send hi nhi hua fethc code me data shi nhi hai",errDaata.error.message)
    }
    const data = await response.json();
    console.log(data); 
console.log("requset sent successfully");

   } catch (error) {
    console.log(error);
   }
  };
  return (
    <div className="bg-slate-600">
      <div className=" m-5 bg-cyan-300 rounded-lg">
        <form onSubmit={resetFormHandler} className=" px-6 py-6 flex justify-center items-center">
          <div className="p-5">
            <label htmlFor="email2">Email</label>
            <input
              type="email"
              id="email2"
              value={email1}
              onChange={emailChangeHanler}
              className="pl-2 rounded-3xl"
            />
          </div>
          <div className="p-5">
            <label htmlFor="pass2">Password Reset</label>
            <input
              type="password"
              id="pass2"
              value={resetPass}
              onChange={resetPassChangeHandler}
              className="pl-2 rounded-3xl"
            />
          </div>
          <span className="bg-rose-200 hover:bg-rose-500 rounded-3xl p-5">
            <button> Reset Password</button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
