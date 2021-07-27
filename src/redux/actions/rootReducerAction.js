import * as types from '../types';

export const fetchApi=(payload)=>({
    type:types.FETCH_API,
    payload,
});

export const mergeApi=(payload)=>({
    type:types.MERGE_API,
    payload,
});