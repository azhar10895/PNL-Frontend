import { createStore, applyMiddleware } from 'redux'
import { fetchReducer } from './Reducer/fetchReducer'
import thunk from 'redux-thunk'

export const store = createStore(fetchReducer, applyMiddleware(thunk))