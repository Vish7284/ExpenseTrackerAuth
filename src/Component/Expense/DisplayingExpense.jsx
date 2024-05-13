import { useContext } from "react";
import ExpenseContext from "../../store/expense-context";


const DisplayingExpense = ()=>{
    const expCtx = useContext(ExpenseContext);
    console.log(expCtx.expenses);

    return (
        <div>
            <ul>
                {expCtx.expenses.map((expense,index)=>{
                    return <li key={index}> Rs.--{expense.money}{expense.desc} {expense.cat}</li>
                })}
            </ul>
        </div>
    )
}
export default DisplayingExpense;