import React, { useEffect, useState } from "react";
import axios from "axios";
import { getApiCall, postApiCall } from "../../../utils/axios";
import { API_URLS } from "../../../config/index";
import Select from "react-select";
import "../styles/settings.css";
import NavigationEveryPage from "../../Nav/NavigationEveryPage";
import { useFormik } from "formik";

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
    select: " ",
    setBrokerageRate: " ",
  };
  const onSubmit = (values) => {
    if (values?.select && values?.setBrokerageRate) {
      setBrokerage(account, Number(value));
    }
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
  console.log("formik account value::::",formik.values.select)
  return (
    <>
      <div className="SettingsPage">
        <div>
          <NavigationEveryPage pageName="Settings" />
        </div>

        <div className="container-fluid ">
          <div className="setCard">
            <form onSubmit={formik.handleSubmit}>
              <div className="SelecttAccount">
                <Select
                  className="AccountSelectofSetPage"
                  options={data}
                  name="select"
                  value={formik.values.select}
                  onChange={formik.handleChange}
                  placeholder="Select Account"
                />
              </div>
              <div>
                <input
                  className="enterbrokerageinputbox"
                  placeholder="Set Brokerage value"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.setBrokerageRate}
                  name="setBrokerageRate"
                />
              </div>
              <div className="SetBrokerageofSetPage">
                <div className="EnterRatefield">
                  Current Brokerage Value : {value}
                </div>
                <div className="col-12">
                  {formik.touched.setBrokerageRate &&
                  formik.errors.setBrokerageRate ? (
                    <div className="error">
                      {formik.errors.setBrokerageRate}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className=" submittButton">
                {/* <button className = "BrokerageSubmitButton" onClick={submitHandler}> Set Rate</button> */}
                <button type="submit" className="BrokerageSubmitButton">
                  Set Rate
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
