import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "../../store/expenses";
import FileDownloader from "./FileDownLoader";
import ExpenseForm from "./ExpenseForm";

const DisplayingExpense = () => {
  const [openForm, setOpenForm] = useState(false);
  const [money, setMoney] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");

  const props = {
    money,
    setMoney,
    desc,
    setDesc,
    cat,
    setCat,
    setOpenForm,
  };
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  // const finalEmail = useSelector((state) => state.auth.userId);
  const expenses = useSelector((state) => state.expenses.expenses);

  // console.log(finalEmail);
  var emailClean = localStorage.getItem("cleanedEmail");
  const addExpenseHandler = () => {
    setOpenForm((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://reduxcart-a19fd-default-rtdb.firebaseio.com/ExpenseData/${emailClean}.json`
        );

        if (!response.ok) {
          const errdata = await response.json();
          throw new Error(
            "nhi hua hai fetch data firebase se dekho kya problem hai",
            errdata
          );
        }

        const data = await response.json();
        const loadedExpenses = [];

        for (const key in data) {
          loadedExpenses.push({
            id: key,
            ...data[key],
          });
        }

        console.log(loadedExpenses);
        dispatch(expensesActions.setExpenses(loadedExpenses));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch]);

  const totalExpense = expenses.reduce(
    (acc, item) => acc + Number(item.money),
    0
  );

  const deleteExpense = async (expenseId) => {
    try {
      const response = await fetch(
        `https://reduxcart-a19fd-default-rtdb.firebaseio.com/ExpenseData/${emailClean}/${expenseId}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }
      dispatch(expensesActions.deleteExpense({ id: expenseId }));
    } catch (error) {
      console.error(error);
    }
  };

  const editExpenseHandler = async (expenseId) => {
    try {
      const response = await fetch(
        `https://reduxcart-a19fd-default-rtdb.firebaseio.com/ExpenseData/${emailClean}/${expenseId}.json`
      );
      if (!response.ok) throw new Error("Failed to fetch expense");

      const data = await response.json();
      console.log(data);
      setOpenForm(true);
      setMoney(data.money);
      setCat(data.cat);
      setDesc(data.desc);
      dispatch(expensesActions.editExpense({ id: expenseId, ...expenses }));
      dispatch(expensesActions.deleteExpense({ id: expenseId }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-10">
        {!openForm ? (
          <button
            className="bg-purple-300 hover:bg-purple-500 rounded-3xl p-5 m-5"
            onClick={addExpenseHandler}
          >
            Add New Expense Here
          </button>
        ) : (
          <ExpenseForm props={props} />
        )}
      </div>
      <div className="flex flex-col justify-center items-start">
        <ul className="w-full">
          {expenses.map((expense, index) => (
            <li
              key={index}
              className="bg-cyan-200 ml-5 flex justify-between rounded-2xl shadow-2xl items-center mb-3 w-11/12 p-3"
            >
              <div className="flex-1">
                <span className="font-bold">Rs.--{expense.money}</span>
                {expense.desc} {expense.cat}
              </div>
              <div className="flex">
                <button
                  className="bg-rose-200 hover:bg-rose-500 rounded-xl p-2 ml-10"
                  onClick={() => deleteExpense(expense.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-rose-200 hover:bg-rose-500 rounded-xl p-2 ml-10"
                  onClick={() => editExpenseHandler(expense.id)}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center w-11/12 m-4">
          <FileDownloader />
          {totalExpense >= 10000 && (
            <button
              className="bg-purple-200 hover:bg-purple-600 p-3 rounded-2xl shadow-2xl"
              onClick={() => {
                console.log("Premium Activated...");
              }}
            >
              Activate Premium
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayingExpense;
