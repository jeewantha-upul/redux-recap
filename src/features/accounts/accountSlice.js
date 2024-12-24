const accountInitialState = {
  balance: 0,
  loan: 0,
  loanPourpose: "",
  isLoading: false,
};

const accountReducer = (state = accountInitialState, action) => {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
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
    case "account/currencyConverting":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

// action creatores related to account
export const deposit = (amount, currency) => {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async (dispatch, getState) => {
    dispatch({ type: "account/currencyConverting" });
    // API call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();

    const convertedCurrency = data.rates.USD;

    // dispatch the action
    dispatch({ type: "account/deposit", payload: convertedCurrency });
  };
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
