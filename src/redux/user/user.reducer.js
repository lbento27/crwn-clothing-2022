import UserActionsTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  //initial_state as default value
  switch (action.type) {
    //to cases stack like below means that if one or another happens they will return the same
    case UserActionsTypes.GOOGLE_SIGN_IN_SUCCESS:
    case UserActionsTypes.EMAIL_SIGN_IN_SUCCESS:
      return {
        ...state, //always return a new obj with all the state and what we want to modify
        currentUser: action.payload,
        error: null,
      };

    case UserActionsTypes.GOOGLE_SIGN_IN_FAILURE:
    case UserActionsTypes.EMAIL_SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
