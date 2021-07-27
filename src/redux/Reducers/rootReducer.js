import * as types from '../types';

const initialState = null;
const rootReducer = (state= initialState,{type, payload})=>{
    switch(type){
        case types.FETCH_API:{
            const updatedState=initialState;
            return updatedState;
        }
        case types.MERGE_API:{
            const mergeState=initialState(payload);
            return mergeState;
        };
        default:
            return state;
    }
}

export default rootReducer;