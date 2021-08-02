import React, { useState, useEffect } from "react";
import Select from "react-select";
import Tables from "./Tables.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Trades.css";
import axios from "axios";
import { postApiCallWithHeaders } from "../../utils/axios";
import { API_URLS } from "../../config";

const Trades = () => {
  const url = "http://3.108.174.21:3000/trades/get-accounts";
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    axios.get(url).then((response) => {
      setAccounts(response.data.res);
    });
  }, [url]);

  const [data, setData] = useState([]);
  console.log(accounts);
  const getTrades = async (account) => {
    const res = await postApiCallWithHeaders(
      API_URLS.getTrades,
      {},
      { limit: 10, offset: 0, accountNo: account }
    );
    console.log("resss:::::::", res?.data?.res);
    const data2 = res?.data?.res;
    // setData({...data2});
  };

  const hello = getTrades(10945);
  hello.then(function(result){
    console.log("result",result);
  })
  const getColumns = (account) => {
    const columns = [];
    getTrades(account);
    console.log(data);
    Object.keys(data).forEach((item) => {
      columns.push({ Header: item, accessor: item });
    });
    return columns;
  };
  const accountsData = [];
  accounts.forEach((account) => {
    console.log("hi");
    const columns = getColumns(account);
    accountsData.push({
      label: account,
      value: account, //<Tables data={data[account]} columns={columns} />,
    });
  });
  console.log("accountsData", accountsData);

  const [resultValue, handlerValue] = useState();
  const selectHandler = (event) => {
    handlerValue(event.value);
  };
  return (
    <>
      <div className="tradesBody">
        <div className="container my-con tradesHeading">
          <div className="middle">Trades</div>
        </div>
        <div className="container my-con">
          <div className="row select">
            <div className="col-12 my-col">
              <Select
                options={accountsData}
                onChange={selectHandler}
                placeholder="Search Account...."
              />
            </div>
            <div className="col-12 my-col">{resultValue}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trades;
