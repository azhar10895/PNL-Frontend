import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/dashboard.css";
import {postApiCallWithHeaders } from "../../../utils/axios";
import { API_URLS } from "../../../config";
import Table from "./Table";
import { useState } from "react";
import { Redirect} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions/rootReducerAction";
import NavigationEveryPage from "../../Nav/NavigationEveryPage";

const Dashboard = () => {
  // const [new_data, setNewData] = useState([]);

  const pnlData = useSelector((state) => state.pnlData);
  const timerId = useRef(null);
  const dispatch = useDispatch();
  const [data, setData] = useState({});

  useEffect(() => {
    getPNL();
    return () => {
      clearInterval(timerId.current);
    };
  }, []);

  useEffect(() => {
    setData({ ...pnlData });
  }, [pnlData]);
  const getPNL = async (timeStamp = null) => {
    try {
      const token = localStorage.getItem("token");

      console.log("timestamp:", timeStamp);

      const header = {
        authorization: `Bearer ${token}`,
      };
      const req = timeStamp ? { timeStamp } : {};
      const res = await postApiCallWithHeaders(
        API_URLS.getPNL,
        {},
        req,
        header
      );

      const resData = res?.data?.res;
      console.log("resData", resData);
      const accountId = Object.keys(resData)[0];
      const time = resData[accountId].lastTimeStamp;
      if (timeStamp === null) {
        console.log("No TimeStamp:::::");
        dispatch(actions.fetchApi(resData));
      } else {
        console.log("TimeStamp:::::");
        dispatch(actions.mergeApi(resData));
      }

      sessionStorage.setItem("TimeStamp", time);
      if (timerId.current === null) {
        console.log("timerid ", timerId.current);
        timerId.current = setInterval(() => getPNL(time), 5000);
      }
    } catch (err) {
      console.log("Error in GetPNL", err);
    }
  };
  return (
    <>
      {!localStorage.getItem("token") ? (
        <Redirect to="/" />
      ) : (
        <>
          <div className="dashboardPage">
            <div className="navigation">
              <NavigationEveryPage pageName="Dashboard" />
            </div>
            <div className="container-fluid">
              {" "}
              {data &&
                Object.keys(data).map((account) => {
                  // console.log("data:::::::::s",data)
                  // console.log("account:::", account);
                  // console.log("::::", Object.keys(data));
                  return (
                    <React.Fragment key={account}>
                      <div className="dashcard-table">
                        <div className="">
                          {data[account]?.data?.length ? (
                            <Table
                              accountData={data[account]}
                              account={account}
                            />
                          ) : (
                            "No Data to show"
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}{" "}
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
};

export default Dashboard;
