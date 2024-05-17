import { createSlice } from "@reduxjs/toolkit";


const InitialExpenseState = { expenses: [] };
const expenseSlice = createSlice({
  name: "expesnes",
  initialState: InitialExpenseState,
  reducers: {
    addExpenses(state,action){
 state.expenses = [...state.expenses ,action.payload
 ]
    },
    setExpenses(state,action){
        state.expenses = [...action.payload];
        console.log(state.expenses);
    },
    setDelete(state,action){
        const newExpenses = state.expenses.filter((ele,item) =>{
            ele.id != action.payload.id
        })
state.expenses = [...newExpenses]
    }
  },
});

export const expensesActions = expenseSlice.actions;

export default expenseSlice.reducer;