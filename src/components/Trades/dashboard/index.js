import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/dashboard.css";
import { getApiCall, postApiCallWithHeaders } from "../../../utils/axios";
import { API_URLS } from "../../../config";
import Table from "./Table";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchTable from "./SearchTable";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions/rootReducerAction";
import Searchable from "react-searchable/lib/Searchable";
import Navbar from "../../Nav/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import { icons } from "react-icons/lib";
import Trades from "../TradesLogs";
import NavigationEveryPage from "../../Nav/NavigationEveryPage";

const Dashboard = () => {
  // const [new_data, setNewData] = useState([]);
  const pnlData = useSelector((state) => state.pnlData);
  useEffect(() => {
    getPNL();
  }, []); //component only mounting
  const timerId = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState({});
  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };
  useEffect(() => {
    setData({ ...pnlData });
  }, [pnlData]); //componentDidUpdate

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
        // setInterval(()=> window.location.reload(false),5000);
      }
    } catch (err) {
      console.log("Error in GetPNL", err);
    }
  };
  return (
    <>
      <div className="dashboardPage">
        <div>
          <NavigationEveryPage pageName="Dashboard" />
        </div>
        <div className="container-fluid">
          {data &&
            Object.keys(data)
              // .filter((val) => {
              //   if (searchTerm === "") {
              //     return val;
              //   } else if (val === searchTerm) {
              //     return val;
              //   }
              // })
              .map((account) => {
                return (
                  <div>
                    <div className="dashcard-table">
                      <div className="">
                        {/* {console.log(
                            "data[account]?.data",
                            data[account]?.data
                          )} */}
                        {data[account]?.data?.length ? (
                          <Table
                            data={data[account]}
                            account={account}
                            key={account}
                          />
                        ) : (
                          "No Data to show"
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
