import {configureStore} from "@reduxjs/toolkit";
import AuthReducer from './auth';
import CounterReducer from './counter'
import CartReducer from "./cart"

// const counterReduser = (state = initialState, action) => {
//   if (action.type === "increment") {
//     return {
//       counter: state.counter + 1,
//       showCounter:state.showCounter,
//     };
//   }
//   if(action.type === "increase"){
//     return{
//         counter:state.counter + action.amount,
//         showCounter:state.showCounter,
//     }
//   }
//   if(action.type === "decrement"){
//     return {
//         counter : state.counter - 1,
//         showCounter:state.showCounter,

//     }
//   }
//   if(action.type === "toggle"){
//     return {
//         showCounter : !state.showCounter,
//         counter:state.counter,
//     }
//   }

//   return state;
// };

const store = configureStore({
  reducer: { counter:CounterReducer ,auth: AuthReducer, cart:CartReducer},
});



export default store;
