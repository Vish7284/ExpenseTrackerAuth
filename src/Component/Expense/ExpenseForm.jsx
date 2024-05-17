import { useState } from "react";

import { expensesActions } from "../../store/expenses";
import { useDispatch } from "react-redux";
const ExpenseForm = () => {
   const [money, setMoney] = useState("");
   const [desc, setDesc] = useState("");
   const [cat, setCat] = useState("");

 

  const dispatch = useDispatch();
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

//    const editExpense=async(expenseId)=>{
// try {
  
//   const response = await fetch(
//     `https://expensetracker-3228d-default-rtdb.firebaseio.com/ExpenseData/${expenseId}.json`,
//     {
//       method: "GET",
//     }
//   );
//   if(!response.ok){
//     throw new Error("nhi karenge update ya edit");
//   };
//   const data = await response.json();
//   console.log(data);
//   setCat(data.cat);
//   setDesc(data.desc);
//   setMoney(data.money)
// } catch (error) {
  
// }
//   }
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
    //  expCtx.addExpense(data);
    dispatch(expensesActions.addExpenses(data))
   } catch (error) {
     console.log(error);
   }

   // expCtx.addExpense(expenseData);
   setMoney("");
   setDesc("");
   setCat("");
 };

  return (
    <div className="bg-slate-300 m-5 rounded-lg">
      <div className="flex justify-center items-center ">
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
