import { takeLatest, call, put } from "redux-saga/effects"; //takeEvery listen to every action that fires
//takeLatest if fire multiple times only the last getting resolve will have the most up to date data
import ShopActionTypes from "./shop.types";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";

export function* fetchCollectionsAsync() {
  //yield console.log("fire");
  try {
    //code converted from thunk to saga from shop.actions fetchCollectionsStartAsync
    const collectionRef = firestore.collection("collections");
    //get data
    const snapshot = yield collectionRef.get();
    const collectionMap = yield call(convertCollectionsSnapshotToMap, snapshot); //call taker a func 1s, 2nd as arguments
    yield put(fetchCollectionsSuccess(collectionMap)); //put is our 'dispatch', dispatch obj
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

//this will pause when a specific action comes
export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
