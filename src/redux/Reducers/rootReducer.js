import * as types from "../types/rootReducerType";

const initialState = null;
const mergeData = (state, payload) => {
  const accounts_new = Object.keys(payload);
  accounts_new.map((accountNo) => {
    state.pnlData[accountNo].data = { ...state.pnlData[accountNo].data };  //changing state data array to object
    payload[accountNo].data = { ...payload[accountNo].data };  //changing payload data array to object
    state.pnlData[accountNo] = { ...state.pnlData[accountNo], ...payload[accountNo] }; //merging
    state.pnlData[accountNo].data = Object.values(state.pnlData[accountNo].data); // changing data object to array
  });
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_API: {
      const updatedState = payload;
      return { ...updatedState };
    }
    /* case types.MERGE_API:{
            const mergeState=
            return mergeState;
        }; */
    default:
      return state;
  }
};

export default rootReducer;
