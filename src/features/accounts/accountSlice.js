const accountInitialState = {
  balance: 0,
  loan: 0,
  loanPourpose: "",
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

// action creatores related to account
export const deposit = (amount) => {
  return { type: "account/deposit", payload: amount };
};
export const withdraw = (amount) => {
  return { type: "account/withdraw", payload: amount };
};
export const loanRequest = (amount, pourpose) => {
  return {
    type: "account/loanRequest",
    payload: { amount, pourpose },
  };
};
export const payLoan = () => {
  return {
    type: "account/payLoan",
  };
};

export default accountReducer;
