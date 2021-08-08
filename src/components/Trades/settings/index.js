import React, { useEffect, useState } from "react";
import axios from "axios";
import { getApiCall, postApiCall } from "../../../utils/axios";
import { API_URLS } from "../../../config/index";
import Select from "react-select";
import { useFormik } from "formik";
import "../styles/settings.css";
import NavigationEveryPage from "../../Nav/NavigationEveryPage";

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
      const data = res?.res?.map((item) => {
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
      const data = res?.res?.map((item) => {
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
    console.log("value", value);
  };

  const brokerageRateHandler = (event) => {
    console.log("account:::", account);
    setValue(event.target.value);
    //   setBrokerag ChevronCompactLefte(account,Number(event.target.value));
    //   setValue(Number(event.target.value));
  };
  const submitHandler = () => {
    console.log("value:::::", value);
    setBrokerage(account, Number(value));
  };

  const initialValues = {
    select: "",
    setBrokerageRate: "",
  };

  const onSubmit = (values) => {
    // if (values?.setBrokerageRate)
    console.log("values::::::",values)
     setBrokerage(account, values.setBrokerageRate);
  };

  const validate = (values) => {
    let errors = {};
    if (!values.select) {
      errors.select = "Account is required";
    }
    if (!values.setBrokerageRate) {
      errors.setBrokerageRate = "Brokerage rate is required";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });


  return (
    <>
      <div className="SettingsPage">
        <div>
          <NavigationEveryPage pageName="Settings" />
        </div>
        <div className="container-fluid">
          <form onSubmit={formik.handleSubmit}>
            <div className="AccountSelectofSetPage">
              <Select
                options={data}
                // name="select"
                // type="select"
                onChange={selectHandler}
                placeholder="Select Account"
                // onBlur={formik.handleBlur}
                // value={formik.values.select}
              />
            </div>
            {value}
            <div className="SetBrokerageofSetPage">
              <input
                placeholder="Set Brokerage value"
                type="text"
                name="setBrokerageRate"
                id="setBrokerageValue"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.setBrokerageRate}
              />
              <div className="col-12">
                {formik.touched.setBrokerageRate && formik.errors.setBrokerageRate ? (
                  <div className="error">{formik.errors.setBrokerageRate}</div>
                ) : null}
              </div>
            </div>
            <div className="button">
              <button type="submit"> Set </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Settings;
