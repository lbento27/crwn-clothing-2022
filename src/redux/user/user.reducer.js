import { UserActionsTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  //initial_state as default value
  switch (action.type) {
    case UserActionsTypes.SET_CURRENT_USER:
      return {
        ...state, //always return a new obj with all the state and what we want to modify
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
