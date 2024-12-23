import { createStore, combineReducers } from "redux";
import userReducer from "./features/users/userSlice";
import accountReducer from "./features/accounts/accountSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  user: userReducer,
});
const store = createStore(rootReducer);

export default store;

// // dispatching account actions
// store.dispatch(deposit(5000));
// console.log(store.getState());
// store.dispatch(withdraw(1000));
// console.log(store.getState());
// store.dispatch(loanRequest(3000, "Buy a house"));
// console.log(store.getState());
// store.dispatch(payLoan());
// console.log(store.getState());

// // dispatching account actions
// store.dispatch(createUser("Jeewantha", "970284044V"));
// console.log(store.getState());
// store.dispatch(updateUser("Nimantha"));
// console.log(store.getState());

// dispatching actions before creating action creators

// store.dispatch({ type: "account/deposit", payload: 5000 });
// store.dispatch();
// console.log(store.getState());
// store.dispatch({ type: "account/withdraw", payload: 1000 });
// console.log(store.getState());
// store.dispatch({
//   type: "account/loanRequest",
//   payload: { amount: 2000, pourpose: "Buy a car" },
// });
// console.log(store.getState());
// store.dispatch({
//   type: "account/payLoan",
// });
// console.log(store.getState());
