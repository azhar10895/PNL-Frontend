import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/dashboard.css";
import { getApiCall, postApiCallWithHeaders } from "../../utils/axios";
import { API_URLS } from "../../config";
import Table from "./Table";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchTable from "./SearchTable";

const Dashboard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getPNL();
  }, []);
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {}, [data]);

  // console.log("data::::", data, "typeof", typeof data);
  const getPNL = async (timeStamp = null) => {
    try {
      const token = localStorage.getItem("token");
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
      console.log("Res data", resData);
      // if (resData.length) {
      setData({ ...resData });
      
      // }
      console.log("API res", res, "typeof::::", typeof res);
    } catch (err) {
      console.log("Error in GetPNL", err);
    }
  };
  const new_data = {
    key1: [
      {
        BuyAvgPrice: "2807.78",
        BuyQty: "130",
        GrossPNL: 143375,
        LastFillPrice: 85,
        LastTimeStamp: "1304176443004645797",
        NetPNL: 143231.625,
        NetPosition: 0,
      },
      {
        BuyAvgPrice: "873347",
        BuyQty: "762372",
        GrossPNL: 143375,
        LastFillPrice: 85,
        LastTimeStamp: "1304176443004645797",
        NetPNL: 143231.625,
        NetPosition: 0,
      },
      {
        BuyAvgPrice: "2807.78",
        BuyQty: "130",
        GrossPNL: 143375,
        LastFillPrice: 85,
        LastTimeStamp: "1304176443004645797",
        NetPNL: 143231.625,
        NetPosition: 0,
      },
      {
        BuyAvgPrice: "873347",
        BuyQty: "762372",
        GrossPNL: 143375,
        LastFillPrice: 85,
        LastTimeStamp: "1304176443004645797",
        NetPNL: 143231.625,
        NetPosition: 0,
      },
      {
        BuyAvgPrice: "2807.78",
        BuyQty: "130",
        GrossPNL: 143375,
        LastFillPrice: 85,
        LastTimeStamp: "1304176443004645797",
        NetPNL: 143231.625,
        NetPosition: 0,
      },
      {
        BuyAvgPrice: "873347",
        BuyQty: "762372",
        GrossPNL: 143375,
        LastFillPrice: 85,
        LastTimeStamp: "1304176443004645797",
        NetPNL: 143231.625,
        NetPosition: 0,
      },
      {
        BuyAvgPrice: "2807.78",
        BuyQty: "130",
        GrossPNL: 143375,
        LastFillPrice: 85,
        LastTimeStamp: "1304176443004645797",
        NetPNL: 143231.625,
        NetPosition: 0,
      },
      {
        BuyAvgPrice: "873347",
        BuyQty: "762372",
        GrossPNL: 143375,
        LastFillPrice: 85,
        LastTimeStamp: "1304176443004645797",
        NetPNL: 143231.625,
        NetPosition: 0,
      },
      {
        BuyAvgPrice: "2807.78",
        BuyQty: "130",
        GrossPNL: 143375,
        LastFillPrice: 85,
        LastTimeStamp: "1304176443004645797",
        NetPNL: 143231.625,
        NetPosition: 0,
      },
      {
        BuyAvgPrice: "873347",
        BuyQty: "762372",
        GrossPNL: 143375,
        LastFillPrice: 85,
        LastTimeStamp: "1304176443004645797",
        NetPNL: 143231.625,
        NetPosition: 0,
      },
      {
        BuyAvgPrice: "2807.78",
        BuyQty: "130",
        GrossPNL: 143375,
        LastFillPrice: 85,
        LastTimeStamp: "1304176443004645797",
        NetPNL: 143231.625,
        NetPosition: 0,
      },
      {
        BuyAvgPrice: "873347",
        BuyQty: "762372",
        GrossPNL: 143375,
        LastFillPrice: 85,
        LastTimeStamp: "1304176443004645797",
        NetPNL: 143231.625,
        NetPosition: 0,
      },
      {
        BuyAvgPrice: "2807.78",
        BuyQty: "130",
        GrossPNL: 143375,
        LastFillPrice: 85,
        LastTimeStamp: "1304176443004645797",
        NetPNL: 143231.625,
        NetPosition: 0,
      },
      {
        BuyAvgPrice: "873347",
        BuyQty: "762372",
        GrossPNL: 143375,
        LastFillPrice: 85,
        LastTimeStamp: "1304176443004645797",
        NetPNL: 143231.625,
        NetPosition: 0,
      },
      {
        BuyAvgPrice: "2807.78",
        BuyQty: "130",
        GrossPNL: 143375,
        LastFillPrice: 85,
        LastTimeStamp: "1304176443004645797",
        NetPNL: 143231.625,
        NetPosition: 0,
      },
      {
        BuyAvgPrice: "873347",
        BuyQty: "762372",
        GrossPNL: 143375,
        LastFillPrice: 85,
        LastTimeStamp: "1304176443004645797",
        NetPNL: 143231.625,
        NetPosition: 0,
      },
    ],
    key2: [
      {
        BuyAvgPrice: "2807.78",
        BuyQty: "133500",
        GrossPNL: 143375,
        LastFillPrice: 85,
        LastTimeStamp: "1304176443004645797",
        NetPNL: 143231.625,
        NetPosition: 0,
        SellAvgPrice: "2996.09",
        SellQty: "133500",
        Token: 35010,
        TotalBuy: "315225000",
        TotalQty: 267000,
        TotalSell: "315368375",
      },
      {
        BuyAvgPrice: "873347",
        BuyQty: "76247",
        GrossPNL: 143375,
        LastFillPrice: 85,
        LastTimeStamp: "1304176443004645797",
        NetPNL: 143231.625,
        NetPosition: 0,
      },
    ],
  };
  const saved = Object.keys(new_data);
  console.log("saveddd::", saved);
  console.log(
    "Filter::::::::::::::::::",
    Object.keys(new_data).filter((val) => {
      console.log("value", val);
      if (val === searchTerm) {
        return val;
      } else {
        return saved;
      }
    })
  );
  return (
    <>
      <div className="container">
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
              // .filter(val => {
              //   if(searchTerm===""){
              //     return val
              //   }
              //   else if(val===searchTerm)
              //   {
              //     return val
              //   }
              // })
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
