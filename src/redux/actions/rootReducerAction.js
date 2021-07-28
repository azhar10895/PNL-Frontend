import * as types from '../types/rootReducerType';

 const fetchApi=(payload)=>({
    type:types.FETCH_API,
    payload,
});

 const mergeApi=(payload)=>({
    type:types.MERGE_API,
    payload,
});

export { fetchApi , mergeApi};