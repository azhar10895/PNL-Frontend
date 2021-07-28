import * as types from '../types/rootReducerType';

const initialState = null;
const mergeData=(state,payload)=>{
    
}

const rootReducer = (state= initialState,{type, payload})=>{

    switch(type){
        case types.FETCH_API:{
            const updatedState = payload;
            return {...updatedState};
        }
        /* case types.MERGE_API:{
            const mergeState=
            return mergeState;
        }; */
        default:
            return state;
    }
}

export default rootReducer;