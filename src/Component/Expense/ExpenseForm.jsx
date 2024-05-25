import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "../../store/expenses";

const ExpenseForm = (props) => {
 const { money, setMoney, desc, setDesc, cat, setCat,setOpenForm } = props.props;
  const dispatch = useDispatch();
  var finalCleanEmail = localStorage.getItem("cleanedEmail");
  console.log(finalCleanEmail);

  const moneyChangeHandler = (e) => {
    setMoney(e.target.value);
  };
  const desChangeHandler = (e) => {
    setDesc(e.target.value);
  };
  const catChangeHandler = (e) => {
    setCat(e.target.value);
  };

  const addingExpenseFormHandler = async (e) => {
    e.preventDefault();

    const expenseData = { money, desc, cat };

    try {
      const response = await fetch(
        `https://reduxcart-a19fd-default-rtdb.firebaseio.com/ExpenseData/${finalCleanEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify(expenseData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to add expense");

      const data = await response.json();
      console.log(data);
      const expenseArr = { id: data.name, ...expenseData };
      dispatch(expensesActions.addExpense(expenseArr));

      setMoney("");
      setDesc("");
      setCat("");

      console.log("Expense added successfully!");
    } catch (error) {
      console.error("Error adding expense:", error);
    }

    setOpenForm(false)
  };

  return (
    <div className="bg-slate-300 m-5 rounded-lg">
      <div className="flex justify-center items-center">
        <form
          className="bg-rose-200 p-6 inline-block rounded-2xl shadow-xl m-5"
          onSubmit={addingExpenseFormHandler}
        >
          <div className="mb-4">
            <label htmlFor="money">Money Spent</label>
            <input
              type="number"
              id="money"
              className="rounded-xl p-2 ml-1"
              value={money}
              onChange={moneyChangeHandler}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="desc">Description</label>
            <input
              type="text"
              id="desc"
              className="rounded-xl p-2 ml-3"
              value={desc}
              onChange={desChangeHandler}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cat">Choose Category</label>
            <select
              id="cat"
              className="rounded-xl p-2 ml-3"
              value={cat}
              onChange={catChangeHandler}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Health">Health</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>
          <button className="bg-cyan-300 hover:bg-cyan-500 rounded-2xl border-blue-400 p-3 mt-4 ml-4 shadow-lg">
            Add to Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
