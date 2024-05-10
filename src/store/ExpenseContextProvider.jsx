import ExpenseContext from "./expense-context";


const ExpenseContextProvider =(props)=>{


const value = {
 
};
    return (
        <ExpenseContext.Provider value={value}>
            {props.children}
        </ExpenseContext.Provider>
    )
}
export default ExpenseContextProvider;