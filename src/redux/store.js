import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

import { persistStore } from "redux-persist";

//import thunk from "redux-thunk"; //now using Saga
import createSagaMiddleware from "redux-saga";
//import { fetchCollectionsStart } from "./shop/shop.sagas";

import rootSaga from "./root-saga";

//const middlewares = [thunk];
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
