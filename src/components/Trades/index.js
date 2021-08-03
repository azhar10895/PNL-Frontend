import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import Tables from "./Tables.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Trades.css";
import axios from "axios";
import { getApiCall, postApiCall } from "../../utils/axios";
import { API_URLS } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/rootReducerAction";

const Trades = () => {
  const [data, setData] = useState([]);

  const [accounts, setAccounts] = useState([]);
  const [columns, setColumns] = useState([]);

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
    } catch (err) {}
  };

  const getTrades = async (account) => {
    try {
      const res = await postApiCall(
        API_URLS.getTrades,
        {},
        { limit: 10, offset: 0, accountNo: account }
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

  const [resultValue, setResultValue] = useState();
  const selectHandler = (event) => {
    setResultValue(event.value);
    getTrades(event.value);
  };
  return (
    <>
      <div className="tradesBody">
        <div className="container my-con tradesHeading dashcard">
          <div>Trades</div>
        </div>
        <div className="my-con dashcard">
          <div className="row tradesContent">
            <div className="col-12 my-col">
              <Select
                options={accounts}
                onChange={selectHandler}
                placeholder="Select Account"
                // value={}
              />
            </div>
            {/* <div className="col-12 my-col">{resultValue}</div> */}
          </div>
          <div className="row tradesContent">
            <div className="col-12 my-col">
              {data?.length ? (
                <Tables data={data || []} columns={columns} />
              ) : (
                "No data found"
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trades;
