import { createSlice } from "@reduxjs/toolkit";

const InitialExpenseState = { expenses: [] };

const expenseSlice = createSlice({
  name: "expenses",
  initialState: InitialExpenseState,
  reducers: {
    addExpense(state, action) {
      state.expenses = [...state.expenses, action.payload];
      // console.log(
      //   action.payload,
      //   "from the addExpense in expense reducers function"
      // );
    },
    setExpenses(state, action) {
      state.expenses = [...action.payload];
      console.log(state.expenses);
    },
    deleteExpense(state, action) {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
      console.log(state.expenses);
    },
    editExpense(state, action) {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
      console.log(state.expenses);
    },
  },
});

export const expensesActions = expenseSlice.actions;
export default expenseSlice.reducer;
