import React, { useState } from "react";
import axios from "axios";
import { getApiCall } from "../../../utils/axios";
import { API_URLS } from "../../../config/index";

const Settings = () => {
  const [data, setData] = useState([]);
  const getBrokerage = async () => {
    try {
      const res = await getApiCall(API_URLS.getBrokerage, {});
      const data = res?.res;
      console.log("res:::::::::",res);
      
    } catch (err) {}
  };
  return (
    <div>
      <input placeholder="Enter rate" />
    </div>
  );
};

export default Settings;