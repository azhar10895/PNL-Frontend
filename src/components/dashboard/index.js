import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/dashboard.css";
import { getApiCall, postApiCallWithHeaders } from "../../utils/axios";
import { API_URLS } from "../../config";
import Table from "./Table";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchTable from "./SearchTable";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/rootReducerAction";
import Navbar from '../Nav/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';




const Dashboard = () => {
  // const [new_data, setNewData] = useState([]);
  const pnlData = useSelector((state) => state.pnlData);
  useEffect(() => {
    getPNL();
  }, []);
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
    setData({ ...pnlData }); //setting data
  }, [pnlData]);

  const getPNL = async (timeStamp = null) => {
    try {
      const token = localStorage.getItem("token");
      // console.log(
      //   "----------------------------------------------------------------"
      // );
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
      //  setData({...pnlData});
      const resData = res?.data?.res;
      const accountId = Object.keys(resData)[0];
      const time = resData[accountId].lastTimeStamp;
      if (timeStamp === null) {
        console.log("No TimeStamp:::::");
        dispatch(actions.fetchApi(resData));
      } else {
        console.log("TimeStamp:::::");
        console.log("mergeapiconsole", resData);
        dispatch(actions.mergeApi(resData));
      }

      sessionStorage.setItem("TimeStamp", time);
      // console.log("time::::", time);
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
      <div className="container-fluid">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' exact component={Dashboard} />
          
        </Switch>
      </Router>
        <div className="dashcard align-top">
          <div className="row">
            <div className="col-7">
              <h2 className="color-forHeadings text-left">Dashboard</h2>
            </div>
            <div className="col-3 SearchBar">
              <input
                className=""
                placeholder="Search"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              {/* <SearchTable /> */}
            </div>
            <div className="col-2">
              {/* <DropdownLogout /> */}
            
            <h2><button type="button"  className="button float-end cursor-">
     Logout
  </button></h2>
  {/* <div className="dropdownn">
    <ul>
      <li onClick={logout}>Logout</li>
      <li>Option 2</li>
      <li>Option 3</li>
      <li>Option 4</li>
    </ul>
  </div> */}
              
            </div>
          </div>
        </div>
        <div>
          <div>
            {data &&
              Object.keys(data)
                .filter((val) => {
                  if (searchTerm === "") {
                    return val;
                  } else if (val === searchTerm) {
                    return val;
                  }
                })
                .map((account) => {
                  // console.log("data[account]?.data", data[account]?.data);
                  return (
                    <div>
                      <div className="dashcard">
                        <div className="accountID">A/C No: {account}</div>
                        <div className="">
                          {console.log(
                            "data[account]?.data",
                            data[account]?.data
                          )}
                          {data[account]?.data?.length ? (
                            <Table data={data[account]?.data} key={account} />
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
      </div>
    </>
  );
};

export default Dashboard;
