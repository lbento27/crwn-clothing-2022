import UserActionsTypes from "./user.types";

// export const setCurrentUser = (user) => ({
//   type: UserActionsTypes.SET_CURRENT_USER,
//   payload: user,
// });

export const googleSignInStart = () => ({
  type: UserActionsTypes.GOOGLE_SIGN_IN_START, //doesn't have payload because we are just telling the saga to trigger the sign in
});

export const emailSignInStart = (emailAndPassword) => ({
  type: UserActionsTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword,
});

export const signInSuccess = (user) => ({
  type: UserActionsTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: UserActionsTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const checkUserSession = () => ({
  type: UserActionsTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
  type: UserActionsTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionsTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: UserActionsTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const signUpStart = (userCredentials) => ({
  type: UserActionsTypes.SIGN_UP_START,
  payload: userCredentials,
});

export const signUpSuccess = ({ user, additionalData }) => ({
  type: UserActionsTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData },
});

export const signUpFailure = (error) => ({
  type: UserActionsTypes.SIGN_UP_FAILURE,
  payload: error,
});
