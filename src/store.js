import { createStore, combineReducers } from "redux";

const accountInitialState = {
  balance: 0,
  loan: 0,
  loanPourpose: "",
};

const userInitialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case "user/createUser":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };
    case "user/updateUser":
      return {
        ...state,
        fullName: action.payload.fullName,
      };
    default:
      return state;
  }
};

const accountReducer = (state = accountInitialState, action) => {
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
        balance: state.balance - state.loan,
        loan: 0,
        loanPourpose: "",
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  account: accountReducer,
  user: userReducer,
});
const store = createStore(rootReducer);

// action creatores related to account
const deposit = (amount) => {
  return { type: "account/deposit", payload: amount };
};
const withdraw = (amount) => {
  return { type: "account/withdraw", payload: amount };
};
const loanRequest = (amount, pourpose) => {
  return {
    type: "account/loanRequest",
    payload: { amount, pourpose },
  };
};
const payLoan = () => {
  return {
    type: "account/payLoan",
  };
};

// action creatores related to user
const createUser = (name, id) => {
  return {
    type: "user/createUser",
    payload: {
      fullName: name,
      nationalId: id,
      createdAt: Date.now(),
    },
  };
};
const updateUser = (name) => {
  return {
    type: "user/updateUser",
    payload: {
      fullName: name,
    },
  };
};

// dispatching account actions
store.dispatch(deposit(5000));
console.log(store.getState());
store.dispatch(withdraw(1000));
console.log(store.getState());
store.dispatch(loanRequest(3000, "Buy a house"));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());

// dispatching account actions
store.dispatch(createUser("Jeewantha", "970284044V"));
console.log(store.getState());
store.dispatch(updateUser("Nimantha"));
console.log(store.getState());

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
