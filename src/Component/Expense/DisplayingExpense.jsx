import { useContext } from "react";
import ExpenseContext from "../../store/expense-context";

const DisplayingExpense = () => {
  const expCtx = useContext(ExpenseContext);

  const deleteExpenseHandler = (expenseId) => {
    expCtx.deleteExpense(expenseId);
    console.log("Expepnse SuccessFully Deleted");
  };
  const editExpenseHandler =(expenseId)=>{
    expCtx.editExpense(expenseId);
    expCtx.updateExpense(expenseId)
    console.log("Edit ho  gya ");
  }

  return (
    <div>
      <ul>
        {expCtx.expenses.map((expense, index) => {
          return (
            <li
              key={index}
              className="bg-cyan-200 ml-5 flex justify-end rounded-2xl shadow-2xl items-center  mb-3 max-w-fit pl-5"
            >
              Rs.--{expense.money}
              {expense.desc} {expense.cat}
              <button
                className="bg-rose-200 hover:bg-rose-500 rounded-xl p-2 ml-10"
                onClick={() => deleteExpenseHandler(expense.id)}
              >
                {" "}
                Delete
              </button>
              <button className="bg-rose-200 hover:bg-rose-500 rounded-xl p-2 ml-10"  onClick={()=>editExpenseHandler(expense.id)}>
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
