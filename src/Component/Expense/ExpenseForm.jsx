import { useContext, useState } from "react";
import ExpenseContext from "../../store/expense-context";

const ExpenseForm = () => {
 
  const expCtx = useContext(ExpenseContext);


  return (
    <div className="bg-slate-300 m-5 rounded-lg">
      <div className="flex justify-center items-center ">
        <form
          className="bg-rose-200 p-6 inline-block rounded-2xl shadow-xl m-5"
          onSubmit={expCtx.addingExpenseFormHandler}
        >
          <div className="mb-4">
            <label htmlFor="money">Money Spent</label>
            <input
              type="number"
              id="money"
              className="rounded-xl p-2 ml-1"
              value={expCtx.money}
              onChange={expCtx.moneyChangeHandler}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="desc">Description</label>
            <input
              type="text"
              id="desc"
              className="rounded-xl p-2 ml-3"
              value={expCtx.desc}
              onChange={expCtx.desChangeHandler}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cat">Choose Category</label>
            <select
              id="cat"
              className="rounded-xl p-2 ml-3"
              value={expCtx.cat}
              onChange={expCtx.catChangeHandler}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="1">Food</option>
              <option value="2">Petrol</option>
              <option value="3">Health</option>
              <option value="4">Fashion</option>
            </select>
          </div>
          <button className="bg-cyan-300 hover:bg-cyan-500 rounded-2xl border-blue-400 p-3 mt-4 ml-4 shadow-lg">
            Add To Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
