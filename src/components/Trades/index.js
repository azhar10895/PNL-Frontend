import React, { useState, useEffect } from "react";
import Select from "react-select";
import Tables from "./Tables.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Trades.css";
import axios from 'axios';

const Trades = () => {
  const data = {};
  // const [data, setData] = useState([]);
  // const data = {
  //   account1: [
  //     {
  //       BuyAvgPrice: "280700000.78",
  //       BuyQty: "2",
  //       GrossPNL: 143375,
  //       LastFillPrice: 85,
  //       LastTimeStamp: "1304176443004645797",
  //     },
  //     {
  //       BuyAvgPrice: "280700000.78",
  //       BuyQty: "2",
  //       GrossPNL: 143375,
  //       LastFillPrice: 85,
  //       LastTimeStamp: "1304176443004645797",
  //     },
  //     {
  //       BuyAvgPrice: "280700000.78",
  //       BuyQty: "2",
  //       GrossPNL: 143375,
  //       LastFillPrice: 85,
  //       LastTimeStamp: "1304176443004645797",
  //     },
  //     {
  //       BuyAvgPrice: "280700000.78",
  //       BuyQty: "2",
  //       GrossPNL: 143375,
  //       LastFillPrice: 85,
  //       LastTimeStamp: "1304176443004645797",
  //     },
  //     {
  //       BuyAvgPrice: "280700000.78",
  //       BuyQty: "2",
  //       GrossPNL: 143375,
  //       LastFillPrice: 85,
  //       LastTimeStamp: "1304176443004645797",
  //     },
  //     {
  //       BuyAvgPrice: "280700000.78",
  //       BuyQty: "2",
  //       GrossPNL: 143375,
  //       LastFillPrice: 85,
  //       LastTimeStamp: "1304176443004645797",
  //     },
  //     {
  //       BuyAvgPrice: "280700000.78",
  //       BuyQty: "2",
  //       GrossPNL: 143375,
  //       LastFillPrice: 85,
  //       LastTimeStamp: "1304176443004645797",
  //     },
  //     {
  //       BuyAvgPrice: "280700000.78",
  //       BuyQty: "2",
  //       GrossPNL: 143375,
  //       LastFillPrice: 85,
  //       LastTimeStamp: "1304176443004645797",
  //     },
  //     {
  //       BuyAvgPrice: "280700000.78",
  //       BuyQty: "2",
  //       GrossPNL: 143375,
  //       LastFillPrice: 85,
  //       LastTimeStamp: "1304176443004645797",
  //     },
  //     {
  //       BuyAvgPrice: "280700000.78",
  //       BuyQty: "2",
  //       GrossPNL: 143375,
  //       LastFillPrice: 85,
  //       LastTimeStamp: "1304176443004645797",
  //     },
  //     {
  //       BuyAvgPrice: "280700000.78",
  //       BuyQty: "2",
  //       GrossPNL: 143375,
  //       LastFillPrice: 85,
  //       LastTimeStamp: "1304176443004645797",
  //     },
  //     {
  //       BuyAvgPrice: "280700000.78",
  //       BuyQty: "2",
  //       GrossPNL: 143375,
  //       LastFillPrice: 85,
  //       LastTimeStamp: "1304176443004645797",
  //     },
  //   ],
  //   account3: [
  //     {
  //       BuyAvgPrice: "280700000.78",
  //       BuyQty: "1",
  //     },
  //     {
  //       BuyAvgPrice: "280700000.78",
  //       BuyQty: "1",
  //     },
  //   ],
  //   account4: [
  //     {
  //       BuyAvgPrice: "280700000.78",
  //       BuyQty: "1",
  //     },
  //     {
  //       BuyAvgPrice: "280700000.78",
  //       BuyQty: "1",
  //     },
      
  //   ]
  // };

  const accounts = Object.keys(data);
  const accountsList = [];
  accounts.forEach((account) => {
    const columns = [];
    Object.keys(data[account][0]).forEach((item) => {
      columns.push({ Header: item, accessor: item });
    });
    accountsList.push({
      label: account,
      value: <Tables data={data[account]} columns={columns} />,
    });
  });
  console.log(accountsList);

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
                options={accountsList}
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
