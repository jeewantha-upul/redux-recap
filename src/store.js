import { createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPourpose: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        balance: state.balance - action.payload,
      };
    case "account/loanRequest":
      // if the user have already got a loan, dont update the states
      if (state.loan > 0) return;
      return {
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPourpose: action.payload.pourpose,
      };
    case "account/payLoan":
      return {
        balance: state.balance - action.payload,
        loan: 0,
        loanPourpose: "",
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

store.dispatch({ type: "account/deposit", payload: 5000 });
console.log(store.getState());
store.dispatch({ type: "account/withdraw", payload: 1000 });
console.log(store.getState());
store.dispatch({
  type: "account/loanRequest",
  payload: { amount: 2000, pourpose: "Buy a car" },
});
console.log(store.getState());
store.dispatch({
  type: "account/payLoan",
  payload: 6000,
});
console.log(store.getState());
