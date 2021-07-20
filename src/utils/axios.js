/* eslint-disable import/no-cycle */
/* eslint-disable no-async-promise-executor */
import axios from "axios";
import { API_URLS } from "../config";

const baseURL = API_URLS.baseUrl;


const getApiCall = (url, paramsData = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let requestUrl = baseURL + url;
      const paramsLength = Object.values(paramsData);
      if (paramsLength.length) {
        requestUrl += `?`;
        Object.keys(paramsData).forEach((key) => {
          requestUrl += `${key}=${paramsData[key]}&`;
        });
        requestUrl = requestUrl.slice(0, -1);
      }
      const res = await axios.get(requestUrl);
      resolve(res.data);
    } catch (err) {
      reject(err);
    }
  });
};

const postApiCall = (url, paramsData = {}, reqBody) => {
  return new Promise(async (resolve, reject) => {
    try {
      let requestUrl = baseURL + url;
      const paramsLength = Object.values(paramsData);
      if (paramsLength.length) {
        requestUrl += `?`;
        Object.keys(paramsData).forEach((key) => {
          requestUrl += `${key}=${paramsData[key]}&`;
        });
        requestUrl = requestUrl.slice(0, -1);
      }
      resolve(
        await axios.post(requestUrl, reqBody)
      );
    } catch (err) {
      reject(err);
    }
  });
};
const postApiCallWithHeaders = (url, paramsData = {}, reqBody, headers = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      let requestUrl = baseURL + url;
      const paramsLength = Object.values(paramsData);
      if (paramsLength.length) {
        requestUrl += `?`;
        Object.keys(paramsData).forEach((key) => {
          requestUrl += `${key}=${paramsData[key]}&`;
        });
        requestUrl = requestUrl.slice(0, -1);
      }
      resolve(
        await axios.post(requestUrl, reqBody, {
          headers: headers,
        })
      );
    } catch (err) {
      reject(err);
    }
  });
};

export { getApiCall, postApiCall, postApiCallWithHeaders };
