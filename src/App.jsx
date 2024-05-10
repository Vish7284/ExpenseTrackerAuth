import "./index.css";
import SignUp from "./Component/SignUp";
import SignIn from "./Component/SignIn";
import { useState } from "react";
import { Route } from "react-router-dom/cjs/react-router-dom";
import HomePage from "./Component/HomePage";
function App() {
    const [isLogIn ,setIsLogin] = useState(false)
  

  return (
    <div>
      {!isLogIn &&
        <>
          <SignUp />
          <SignIn />
        </>
      }
      {isLogIn && (
        <Route path="/Home">
          <HomePage />
        </Route>
      )}
    </div>
  );
}

export default App;
