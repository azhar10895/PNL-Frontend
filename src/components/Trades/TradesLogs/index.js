import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import Tables from "./Tables.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Trades.css";
import axios from "axios";
import { getApiCall, postApiCall } from "../../../utils/axios";
import { API_URLS } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions/rootReducerAction";

const Trades = () => {
  const [data, setData] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [columns, setColumns] = useState([]);
  const [account, setAccount] = useState();
  const [limit, setLimit] = useState(10);
  const [pageNO, setPageNo] = useState(0);
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
  const getTrades = async (account, limit = 10, offset = 0) => {
    try {
      const res = await postApiCall(
        API_URLS.getTrades,
        {},
        { limit: limit, offset: offset, accountNo: account }
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

  const selectHandler = (event) => {
    setAccount(event.value);
    getTrades(event.value);
  };

  console.log("account::::::::::::", account);

  const limitHandler = (event) => {
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
    setPageNo(pageNO+1);
    getTrades(account,limit,pageNO+1);
  };
  return (
    <>
      <div className="tradesBody">
        <div className="my-con tradesHeading">
          <div className="">Trade Logs</div>
          <hr />
        </div>
        
        <div className="my-con dashcard-table">
          <div className="row tradesContent">
            <div className="col-10 my-col">
              <Select
                options={accounts}
                onChange={selectHandler}
                placeholder="Select Account"
                className="select"
                // value={}
              />
            </div>

            <div className="col-1 recordPerPage">
              <input
                type="text"
                onChange={limitHandler}
                placeholder="No. of Trades per page"
              />
            </div>

            {/* <div className="col-12 my-col">{resultValue}</div> */}
          </div>
          <div className="row tradesContent">
            <div className="col-12 my-col">
              {data?.length ? (
                <Tables data={data || []} columns={columns} />
              ) : (
                <div className="h4 color-forHeadings">No data found</div>
              )}
            </div>
          </div>
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
            Page: &nbsp;
            <input
              type="text"
              onChange={pageHandler}
              placeholder={pageNO + 1}
            />
            <button onClick={rightButtonHandler}>&raquo;</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trades;
