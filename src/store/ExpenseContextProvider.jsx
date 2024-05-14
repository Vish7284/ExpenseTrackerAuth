import { useEffect, useState } from "react";
import ExpenseContext from "./expense-context";

const ExpenseContextProvider = (props) => {
  const localToken = JSON.parse(localStorage.getItem("token"));
  const [token, setToken] = useState(localToken);
  const [expenses, setExpenses] = useState([]);
  const [money, setMoney] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");

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
            photoUrl: user.photoUrl,
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

  const moneyChangeHandler = (e) => {
    setMoney(e.target.value);
  };
  const desChangeHandler = (e) => {
    setDesc(e.target.value);
  };
  const catChangeHandler = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex].text;
    setCat(selectedOption);
  };

  const addingExpenseFormHandler = async (e) => {
    e.preventDefault();
    const expenseData = {
      money: money,
      desc: desc,
      cat: cat,
    };
    console.log(expenseData);
    try {
      const response = await fetch(
        "https://expensetracker-3228d-default-rtdb.firebaseio.com/ExpenseData.json",
        {
          method: "POST",
          body: JSON.stringify(expenseData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errDaaaata = await response.json();
        throw new Error("nhi save hua data", errDaaaata);
      }

      const data = await response.json();
      console.log(data.name);
      expCtx.addExpense(data);
    } catch (error) {
      console.log(error);
    }

    // expCtx.addExpense(expenseData);
    setMoney("");
    setDesc("");
    setCat("");
  };

  const userIsLoggedIn = !!token;
  const logInHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", JSON.stringify(token));
  };
  const logOutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const addingExpenses = (expense) => {
    setExpenses((prevExpense) => {
      return [...prevExpense, { ...expense }];
    });
  };
  const deleteExpense = async (expenseId) => {
    try {
      const response = await fetch(
        `https://expensetracker-3228d-default-rtdb.firebaseio.com/ExpenseData/${expenseId}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }
      // Updating state to remove the deleted expense
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== expenseId)
      );
    } catch (error) {
      console.error(error);
    }
  };
  const editExpense=async(expenseId)=>{
try {
  
  const response = await fetch(
    `https://expensetracker-3228d-default-rtdb.firebaseio.com/ExpenseData/${expenseId}.json`,
    {
      method: "GET",
    }
  );
  if(!response.ok){
    throw new Error("nhi karenge update ya edit");
  };
  const data = await response.json();
  console.log(data);
  setCat(data.cat);
  setDesc(data.desc);
  setMoney(data.money)
} catch (error) {
  
}
  }
  const updateExpense = async (expenseId) => {
    const expenseData = {
      money: money,
      desc: desc,
      cat: cat,
    };

    try {
      const response = await fetch(
        `https://expensetracker-3228d-default-rtdb.firebaseio.com/ExpenseData/${expenseId}.json`,
        {
          method: "PATCH", // or "PUT" if you want to replace the entire expense
          body: JSON.stringify(expenseData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update expense");
      }

      // Optionally update the state with the updated expense data
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const value = {
    token: token,
    logIn: logInHandler,
    isLoggedIn: userIsLoggedIn,
    userData: userData,
    logOut: logOutHandler,
    expenses: expenses,
    addExpense: addingExpenses,
    deleteExpense: deleteExpense,
    editExpense:editExpense,
    updateExpense:updateExpense,
    money: money,
    desc: desc,
    cat: cat,
    moneyChangeHandler: moneyChangeHandler,
    desChangeHandler: desChangeHandler,
    catChangeHandler: catChangeHandler,
    addingExpenseFormHandler: addingExpenseFormHandler,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
export default ExpenseContextProvider;
