import { takeLatest, put, all, call } from "redux-saga/effects";
import UserActionsTypes from "./user.types";

import {
  googleProvider,
  auth,
  creatUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";

import {
  signInSuccess,
  signInFailure,
  signOutFailure,
  signOutSuccess,
  signUpFailure,
  signUpSuccess,
} from "./user.actions";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      creatUserProfileDocument,
      userAuth,
      additionalData
    ); //same as we did before in out componentDidMount on app.js
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })); //put(), puts things back into our regular Redux flow
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider); //same as we did in the firebase.utils
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionsTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}
//we will get all the action, so we destructure the payload and from that destructure the email and password
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionsTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser(); //we can get null or a user object
    if (!userAuth) return;
    //if instead there is a value
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionsTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* onSignOutStart() {
  yield takeLatest(UserActionsTypes.SIGN_OUT_START, signOut);
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure);
  }
}

export function* onSignUpStart() {
  yield takeLatest(UserActionsTypes.SIGN_UP_START, signUp);
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionsTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
