import { useEffect, useState } from "react";
import ExpenseContext from "./expense-context";

const ExpenseContextProvider = (props) => {
  const localToken = JSON.parse(localStorage.getItem("token"))
const [token ,setToken] = useState(localToken)

 const [userData, setUserData] = useState(null);

 useEffect(() => {
   const fetchUserData = async () => {
     try {
       const response = await fetch(
         "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC8idrG0OBLxrDZD1cJhoo2Z2VVhsnEFYc",
         {
           method: "POST",
           body: JSON.stringify({
             idToken: token,
           }),
           headers: {
             "Content-Type": "application/json",
           },
         }
       );
       if (!response.ok) {
         throw new Error("Failed to fetch user data");
       }
       const userDataResponse = await response.json();
       if (userDataResponse.users && userDataResponse.users.length > 0) {
         // Assuming there's only one user
         const user = userDataResponse.users[0];
         setUserData({
           displayName: user.displayName,
           photoUrl:user.photoUrl,
         });
       }
     } catch (error) {
       console.error("Error fetching user data:", error);
     }
   };

   if (token) {
     fetchUserData();
   }
 }, [token]);

  const userIsLoggedIn = !!(token)
  const logInHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", JSON.stringify(token));
  };
  const value = {
    token:token,
    logIn: logInHandler,
    isLoggedIn: userIsLoggedIn,
    userData :userData,
  };
  return (
    <ExpenseContext.Provider value={value}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
export default ExpenseContextProvider;
