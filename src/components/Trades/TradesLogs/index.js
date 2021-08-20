import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import Tables from "./Tables.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Trades.css";
import axios from "axios";
import { getApiCall, postApiCall } from "../../../utils/axios";
import { API_URLS } from "../../../config";
import NavigationEveryPage from "../../Nav/NavigationEveryPage";
import { Redirect } from "react-router";

const Trades = () => {
  const [data, setData] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [columns, setColumns] = useState([]);
  const [account, setAccount] = useState();
  const [limit, setLimit] = useState(10);
  const [pageNO, setPageNo] = useState(0);
  // const [click, setClick] = useState(null)
  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    try {
      const res = await getApiCall(API_URLS.getAccounts, {});
      const data = res?.res
        ? res?.res?.map((data) => {
            return {
              label: data,
              value: data,
            };
          })
        : [];
      setAccounts([...data]);
      console.log("datasetAccounts", data);
    } catch (err) {}
  };
  const getTrades = async (account, limit = 10, offset = 0,orderBy= "",order=null) => {
    try {
      const res = await postApiCall(
        API_URLS.getTrades,
        {},
        { limit: limit, offset: offset, accountNo: account,orderBy: orderBy,order: order}
      );
      const resData = res?.data?.res?.data;
      console.log("Res data", resData);
      if (resData?.length) {
        const columns = getColumns(resData[0]);
        console.log("Res data", resData);
        setData([...resData]);
        setColumns([...columns]);
      }
    } catch (err) {
      console.log("Error in getTrades", err);
    }
  };

  const getColumns = (row) => {
    try {
      const columns = Object.keys(row).map((item) => {
        return {
          Header: item,
          accessor: item,
        };
      });
      return columns;
    } catch (err) {
      console.log("Error in getColumns", err);
      return [];
    }
  };

  const sortHandler = (orderby, sort) =>{
    getTrades(account,limit,pageNO,orderby, sort);
  }
  const selectHandler = (event) => {
    setAccount(event.value);
    getTrades(event.value);
  };


  const limitHandler = (event) => {
    console.log(event.target.value);
    setLimit(event.target.value !== "" ? Number(event.target.value) : 10);
    getTrades(
      account,
      event.target.value !== "" ? Number(event.target.value) : 10,
      pageNO
    );
  };

  const pageHandler = (event) => {
    setPageNo(event.target.value !== "" ? Number(event.target.value - 1) : 0);
    getTrades(
      account,
      limit,
      event.target.value !== "" ? Number(event.target.value - 1) : 0
    );
  };

  const leftButtonHandler = () => {
    if (pageNO) {
      setPageNo(pageNO - 1);
      getTrades(account, limit, pageNO - 1);
    }
  };

  const rightButtonHandler = () => {
    setPageNo(pageNO + 1);
    getTrades(account, limit, pageNO + 1);
  };
  return (
    <>
    {!localStorage.getItem("token") ? (
        <Redirect to="/" />
      ) :
      <div className="tradesBody">
        <div className="">
          <NavigationEveryPage pageName="Trade Logs" />
        </div>

        <div className="my-con dashcard-table">
          <div className="tradesContent tradesContentItem ">
            <div className="select my-col">
              <Select
                options={accounts}
                onChange={selectHandler}
                placeholder="Select Account"
                className="select"
                // value={}
              />
            </div>
            <div className="recordPerPage">
              {account ? (
                <div className="tradesDropdown">
                  <p>
                    {limit} Trades per Page{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-caret-down-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                  </p>
                  <div className="tradesDropdownContent">
                    <button value="10" onClick={limitHandler}>
                      10
                    </button>
                    <hr />
                    <button value="15" onClick={limitHandler}>
                      15
                    </button>
                    <hr />
                    <button value="20" onClick={limitHandler}>
                      20
                    </button>
                    <hr />
                    <button value="25" onClick={limitHandler}>
                      25
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            {/* <div className="col-12 my-col">{resultValue}</div> */}
          </div>
          <div className="row tradesContent">
            <div className="col-12 my-col">
              {data?.length ? (
                <Tables data={data || []} columns={columns} tradesSort={sortHandler}/>
              ) : account ? (
                <div className="h4 color-forHeadings">No data found</div>
              ) : (
                ""
              )}
            </div>
          </div>
          {account ? (
            <div className="my-pagination color-forHeadings">
              <button
                style={{
                  color: pageNO !== 0 ? "#264a9f" : "black",
                  opacity: pageNO !== 0 ? "1" : "0",
                }}
                onClick={leftButtonHandler}
              >
                &laquo;
              </button>
              Page:&nbsp;
              <input
                type="text"
                onChange={pageHandler}
                placeholder={pageNO + 1}
              />
              <button onClick={rightButtonHandler}>&raquo;</button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>}
    </>
  );
};

export default Trades;
