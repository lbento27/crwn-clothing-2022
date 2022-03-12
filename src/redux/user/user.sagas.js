import { takeLatest, put, all, call } from "redux-saga/effects";
import UserActionsTypes from "./user.types";

import {
  googleProvider,
  auth,
  creatUserProfileDocument,
} from "../../firebase/firebase.utils";

import { googleSignInSuccess, googleSignInFailure } from "./user.actions";

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider); //same as we did in the firebase.utils
    const userRef = yield call(creatUserProfileDocument, user); //same as we did before in out componentDidMount on app.js
    const userSnapshot = yield userRef.get();
    yield put(
      googleSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    ); //put(), puts things back into our regular Redux flow
  } catch (error) {
    yield put(googleSignInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionsTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart)]);
}
