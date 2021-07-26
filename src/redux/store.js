import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import fetchReducer from './Reducers/fetchReducer'



const store = createStore(fetchReducer, applyMiddleware(thunk))
  
export default store;
  