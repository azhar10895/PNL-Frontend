import { ConeStriped } from "react-bootstrap-icons";
import { connectAdvanced } from "react-redux";
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
        payload && payload[accountNo]?.data ? payload[accountNo]?.data : null;
      const newDataObj = dataNew ? convertToObject(dataNew, "Token") : {};
      const updated = { ...oldDataObj, ...newDataObj };
      const sortedArr = sortByTimestamp(updated);
      finalObj[accountNo] = {
        prevTimeStamp: state[accountNo]?.lastTimeStamp,
        lastTimeStamp: payload[accountNo]?.lastTimeStamp
          ? payload[accountNo]?.lastTimeStamp
          : state[accountNo]?.lastTimeStamp,
        data: [...sortedArr],
      };
    });
    // console.log("final:::",finalObj);
    return finalObj;
  } catch (err) {
    console.log("Error in mergeData", err);
    return {};
  }
};

const sortByTimestamp = (array) => {
  const sortedArr = Object.values(array).sort((a, b) => {
    return Number(b?.LastTimeStamp) - Number(a?.LastTimeStamp);
  });
  return sortedArr;
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
const fetchData = (payload) => {
  try {
    const accounts_new = Object.keys(payload);
    const finalObj = {};
    accounts_new.forEach((accountNo) => {
      const dataNew =
        payload && payload[accountNo]?.data ? payload[accountNo]?.data : null;
      const newDataObj = dataNew ? convertToObject(dataNew, "Token") : {};
      const sortedArr = sortByTimestamp(newDataObj);
      finalObj[accountNo] = {
        lastTimeStamp: payload[accountNo]?.lastTimeStamp,
        data: [...sortedArr],
      };
    });
    return finalObj;
  } catch (err) {
    console.log("Error in fetchData ", err);
  }
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_API: {
      const updatedState = fetchData(payload);
      console.log("fetch executed");
      return { ...updatedState };
    }
    case types.MERGE_API: {
      const oldState = { ...state };
      const newState = mergeData(oldState, payload);
      console.log("merge executed");
      return { ...newState };
    }
    default:
      console.log("default executed");
      return state;
  }
};

export default rootReducer;
