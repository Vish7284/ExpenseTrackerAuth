import {useEffect } from "react";
import { expensesActions } from "../../store/expenses";
import { useDispatch, useSelector } from "react-redux";

const DisplayingExpense = () => {
  const dispatch = useDispatch();
  var token = useSelector((state) => state.auth.token);
  // const isLoggedIN = useSelector((state) => state.auth.isAuthenticated);
  const expenses = useSelector((state) => state.expenses.expenses);
 
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
        dispatch(expensesActions.setExpenses(expensesArray));
      } catch (error) {
        console.error(error);
      }
    };

    fetchExpenses();
    
  }, []);

  // useEffect(() => {
  //   const fetchUserData = async () => {
     
  //     try {
  //              console.log(token, "from the displaying the data");

  //       const response = await fetch(
  //         "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC8idrG0OBLxrDZD1cJhoo2Z2VVhsnEFYc",
  //         {
  //           method: "POST",
  //           body: JSON.stringify({
  //             idToken: token,
  //           }),
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
        
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch user data");
  //       }
  //       const userDataResponse = await response.json();
  //       if (userDataResponse.users && userDataResponse.users.length > 0) {
  //         // Assuming there's only one user
  //         const user = userDataResponse.users[0];
  //         console.log(user);
  //        dispatch(expensesActions.setExpenses(user))
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   if (token) {
  //     fetchUserData();
  //   }
   
  // }, [token]);

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
      console.log(expenseId);
      dispatch(expensesActions.setDelete(expenseId));
    } catch (error) {
      console.error(error);
    }
  };
  const editExpenseHandler = (expenseId) => {
    // expCtx.editExpense(expenseId);
    // expCtx.updateExpense(expenseId)
    console.log("Edit ho  gya ");
  };

  return (
    <div>
      <ul>
        {expenses.map((expense, index) => {
          return (
            <li
              key={index}
              className="bg-cyan-200 ml-5 flex justify-end rounded-2xl shadow-2xl items-center  mb-3 max-w-fit pl-5"
            >
              Rs.--{expense.money}
              {expense.desc} {expense.cat}
              <button
                className="bg-rose-200 hover:bg-rose-500 rounded-xl p-2 ml-10"
                onClick={() => deleteExpense(expense.id)}
              >
                {" "}
                Delete
              </button>
              <button
                className="bg-rose-200 hover:bg-rose-500 rounded-xl p-2 ml-10"
                onClick={() => editExpenseHandler(expense.id)}
              >
                Edit
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default DisplayingExpense;
