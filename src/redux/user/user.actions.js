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
