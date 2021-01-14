import charactersReducer from "./reducers/charactersReducer";
import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
  charactersPage: charactersReducer,
});

// CREATE STORE
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
