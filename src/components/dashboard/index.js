import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/dashboard.css";
import { getApiCall, postApiCallWithHeaders } from "../../utils/axios";
import { API_URLS } from "../../config";
import Table from "./Table";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchTable from "./SearchTable";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions/rootReducerAction";
const Dashboard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getPNL();
  }, []);
  const timerId = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  // const [timerId, setTimerId] = useState(null);
  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };
  useEffect(() => {}, [data]);

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
      // console.log("ressssssss::", res);
      const resData = res?.data?.res;
      // console.log("resData::", resData);
      // console.log("//////");
      const accountId = Object.keys(resData)[0];
      const time = resData[accountId].lastTimeStamp;
      if (timeStamp === null) {
        dispatch(actions.fetchApi(resData));
        setData({ ...resData });
      }
      // else {
      //   const incomingData = {
      //     BuyQty: Number(cachedRow.BuyQty) + Number(row.BuyQty),
      //     SellQty: Number(cachedRow.SellQty) + Number(row.SellQty),
      //     TotalBuy: Number(cachedRow.TotalBuy) + Number(row.TotalBuy),
      //     TotalSell: Number(cachedRow.TotalSell) + Number(row.TotalSell),
      //     BuyAvgPrice: (Number(cachedRow.BuyAvgPrice) + Number(row.BuyAvgPrice)) / 2,
      //     SellAvgPrice: (Number(cachedRow.SellAvgPrice) + Number(row.SellAvgPrice)) / 2,
      //     LastFillPrice: Number(row.LastFillPrice),
      //     LastTimeStamp: row.LastTimeStamp,
      //   };
      //   const updatedData = {...resData,...incomingData};
      //   setData({...updatedData});
      // }
      // console.log("iterating", { ...resData });
      // console.log("//////////////////");
      // console.log("after setData:::::", resData);
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

  // setInterval(getPNL(new Date().getDate()),10000);
  // console.log("Timee:::::: 10 seconds up");
  return (
    <>
      <div className="container-fluid">
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
              <h3 onClick={logout} className="float-end cursor-">
                Logout
              </h3>
            </div>
          </div>
        </div>
        <div>
          <div>
            {Object.keys(data)
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (val === searchTerm) {
                  return val;
                }
              })
              .map((account) => {
                console.log("data[account]?.data", data[account]?.data);
                return (
                  <div>
                    <div className="dashcard">
                      <div className="accountID">A/C No: {account}</div>

                      {/* {console.log("helllooooooooo", new_data[account])} */}
                      <div className="">
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
