import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import Tables from "./Tables.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Trades.css";
import axios from "axios";
import { postApiCall } from "../../utils/axios";
import { API_URLS } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/rootReducerAction";

const Trades = () => {
  const url = "http://3.108.174.21:3000/trades/get-accounts";
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    axios.get(url).then((response) => {
      setAccounts(response.data.res);
    });
  }, [url]);
  const [data, setData] = useState({});
  // useEffect(()=>{
  //   accounts.forEach((account)=>{
  //     console.log("account:::::::::::::::::",account);
  //     getTrades(account);
  //   })
  // },[]);
  console.log(accounts);
  const getTrades = async (account) => {
    try {
      const res = await postApiCall(
        API_URLS.getTrades,
        {},
        { limit: 10, offset: 0, accountNo: account }
      );
      const resData = res?.data?.res;
      // console.log("res::::::::::",resData);
      data[account] = resData;
      
    } catch (err) {
      console.log("Error in getTrades", err);
    }
  };

  const accountsData = [];
  accounts.forEach((account) => {
    getTrades(account) //async;
  });  
  
  accounts.forEach((account)=>{
    const columns = [];
    console.log("data",data);
    // console.log("account Data::::", data[10942]);
    if(data[account]!==undefined){
      Object.keys(data[account].data[0]).forEach((item) => {
        columns.push({ Header: item, accessor: item });
      });
    }
      console.log("collll:::::", columns);
      accountsData.push({
        label: account,
        value: <Tables data={(data[account]!==undefined)?data[account].data: []} columns={columns} />,
      });
  })
  

  console.log("accountsData", accountsData);
  const [resultValue, handlerValue] = useState();
  const selectHandler = (event) => {
    handlerValue(event.value);
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
