import * as types from '../types';
const initialState = null;
const rootReducer = (state= initialState,{type, payload})=>{
    switch(type){
        case types.FETCH_API:{
            const updatedState=initialState;
            return updatedState;
        }
        default:
            return state;
    }
}

export default rootReducer;