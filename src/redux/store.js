import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./Reducers/rootReducer";

export const store = createStore(
  combineReducers({pnlData:rootReducer}),
  composeWithDevTools(applyMiddleware(thunk))
);