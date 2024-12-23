const userInitialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerReducer = (state = userInitialState, action) => {
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

// action creatores related to user
export const createUser = (name, id) => {
  return {
    type: "user/createUser",
    payload: {
      fullName: name,
      nationalId: id,
      createdAt: Date.now(),
    },
  };
};
export const updateUser = (name) => {
  return {
    type: "user/updateUser",
    payload: {
      fullName: name,
    },
  };
};

export default customerReducer;
