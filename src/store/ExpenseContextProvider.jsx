import { useEffect, useState } from "react";
import ExpenseContext from "./expense-context";

const ExpenseContextProvider = (props) => {
  const localToken = JSON.parse(localStorage.getItem("token"))
const [token ,setToken] = useState(localToken)
const [expenses,setExpenses] = useState([]);

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
 
  useEffect(() => {

    const fetchExpenses = async () => {
      try {
        const response = await fetch(
          "https://expensetracker-3228d-default-rtdb.firebaseio.com/ExpenseData.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch expenses data");
        }
        const data = await response.json();
        // Converting fetched data object to an array of expenses objects
        const expensesArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setExpenses(expensesArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExpenses();
  }, []);

  const userIsLoggedIn = !!(token)
  const logInHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", JSON.stringify(token));
  };
  const logOutHandler = ()=>{
    setToken(null);
    localStorage.removeItem("token")
  }

  const addingExpenses =(expense)=>{
setExpenses((prevExpense) =>{
  return [...prevExpense,{...expense}]
})
  }
  const value = {
    token: token,
    logIn: logInHandler,
    isLoggedIn: userIsLoggedIn,
    userData: userData,
    logOut: logOutHandler,
    expenses: expenses,
    addExpense:addingExpenses,
  };
  console.log(expenses);
  return (
    <ExpenseContext.Provider value={value}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
export default ExpenseContextProvider;
