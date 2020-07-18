import { createBrowserHistory } from "history";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import photosReducer from "./reducers/photosReducer";
import placesReducer from "./reducers/placesReducer";
import usersReducer from "./reducers/usersReducer";
import { loadFromLocalStorage, localStorageMiddleware } from "./localStorage";

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  router: connectRouter(history),
  places: placesReducer,
  photos: photosReducer,
  users: usersReducer,
});

const middleware = [
  thunkMiddleware,
  routerMiddleware(history),
  localStorageMiddleware,
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, enhancers);

export default store;
