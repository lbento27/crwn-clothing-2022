import { takeLatest, put, all, call } from "redux-saga/effects";
import UserActionsTypes from "./user.types";

import {
  googleProvider,
  auth,
  creatUserProfileDocument,
} from "../../firebase/firebase.utils";

import {
  googleSignInSuccess,
  googleSignInFailure,
  emailSignInSuccess,
  emailSignInFailure,
} from "./user.actions";

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
//we will get all the action, so we destructure the payload and from that destructure the email and password
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    const userRef = yield call(creatUserProfileDocument, user); //same as we did before in out componentDidMount on app.js
    const userSnapshot = yield userRef.get();
    yield put(
      emailSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    );
  } catch (error) {
    yield put(emailSignInFailure(error));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionsTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}
