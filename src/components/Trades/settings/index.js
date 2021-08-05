import React, { useEffect, useState } from "react";
import axios from "axios";
import { getApiCall, postApiCall } from "../../../utils/axios";
import { API_URLS } from "../../../config/index";
import Select from "react-select";
import { ChevronCompactLeft } from "react-bootstrap-icons";

const Settings = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState();
  const [account, setAccount] = useState();
  useEffect(() => {
    getBrokerage();
  }, [value]);
  const getBrokerage = async () => {
    try {
      const res = await getApiCall(API_URLS.getBrokerage, {});
      const data = res?.res.map((item) => {
        return {
          label: item.AccountNo,
          value: item.Brokerage,
        };
      });
      //   console.log("data:::::::::", data);
      setData([...data]);
    } catch (err) {
      console.log("Error in getBrokerage ", err);
    }
  };

  const setBrokerage = async (account, inputBrokerage) => {
    try {
      const res = await postApiCall(
        API_URLS.setBrokerage,
        {},
        { accountNo: account, brokerage: inputBrokerage }
      );
      const data = res?.res.map((item) => {
        return {
          label: item.AccountNo,
          value: item.Brokerage,
        };
      });
      setData([...data]);
    } catch (err) {
      console.log("Error in setBrokerage", err);
    }
  };

  const selectHandler = (event) => {
    // console.log(event.label);
    setAccount(event.label);
    setValue(event.value);
    console.log("value" , value)
  };

  const brokerageRateHandler =(event) =>{
      console.log("account:::",account);
      setValue(event.target.value);
    //   setBrokerage(account,Number(event.target.value));
    //   setValue(Number(event.target.value));
  }
  const submitHandler=()=>{
      console.log("palak" , value);
    setBrokerage(account,Number(value));
  }

  return (
    <>
      <div className="select">
        <Select
          options={data}
          onChange={selectHandler}
          placeholder="Select Account"
        />
        {value}
      </div>
      <div>
          <input placeholder="Set Brokerage value" onChange={brokerageRateHandler}/>
      </div>
      <div>
          <button onClick={submitHandler}> SetBrokerage </button>
      </div>
    </>
  );
};

export default Settings;