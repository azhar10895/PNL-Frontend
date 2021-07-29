import * as types from "../types/rootReducerType";

const initialState = null;
const mergeData = (state, payload) => {
  try {
    const accounts_new = Object.keys(payload);
    const finalObj = {};
    accounts_new.forEach((accountNo) => {
      const dataOld =
        state && state[accountNo]?.data ? state[accountNo]?.data : null;
      const oldDataObj = dataOld ? convertToObject(dataOld, "Token") : {};
      const dataNew =
        payload && payload[accountNo]?.data ? payload[accountNo] : null;
      const newDataObj = dataNew ? convertToObject(dataNew, "Token") : {};
      const updated = { ...oldDataObj, ...newDataObj };
      const sortedArr = Object.values(updated).sort((a, b) => {
        return b?.LastTimeStamp - a?.LastTimeStamp;
      });
      console.log("SortedArr", sortedArr);
      finalObj[accountNo] = {
        prevTimeStamp: state[accountNo]?.lastTimeStamp,
        lastTimeStamp:
          payload[accountNo]?.lastTimeStamp || state[accountNo]?.lastTimeStamp,
        data: [...sortedArr],
      };
    });
    return finalObj;
  } catch (err) {
    console.log("Error in mergeData", err);
    return {};
  }
};

const convertToObject = (list, key) => {
  try {
    const result = {};
    for (var i = 0; i < list.length; i++) {
      result[list[i]["Token"]] = list[i];
    }
    return result;
  } catch (err) {
    console.log("Error in convertToObject", err);
  }
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_API: {
      const updatedState = payload;
      return { ...updatedState };
    }
    case types.MERGE_API: {
      const mergeState = mergeData(state, payload);
      return { ...mergeState };
    }
    default:
      return state;
  }
};

export default rootReducer;
