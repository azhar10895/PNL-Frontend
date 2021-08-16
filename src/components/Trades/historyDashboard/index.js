import React, { useState } from "react";
import NavigationEveryPage from "../../Nav/NavigationEveryPage";
import { postApiCall } from "../../../utils/axios";
import { API_URLS } from "../../../config";
import Table from "../dashboard/Table";
import uuid from "node-uuid";
const HistoryDashboard = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState();
  const onDateChangeFunc = (date) => {
    const d = date;
    const newDate =
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) +
      "-" +
      (d.getDate() < 10 ? "0" + d.getDate() : d.getDate());
    setDate(newDate);
    console.log(newDate);
    getHistoricData(newDate);
  };
  const getHistoricData = async (date) => {
    const res = await postApiCall(API_URLS.getHistoricData, {}, { date: date });
    const data = res?.data?.res;
    setData({ ...data });
  };

  return (
    <>
      <div className="dashboardPage">
        <div className="navigation">
          <NavigationEveryPage
            pageName="History"
            onDateChangeFunc={onDateChangeFunc}
          />
        </div>
        <div className="container-fluid">
          { console.log("data length:::",data.length)}
          {date ? (
            <>
            {/* {(data.length===undefined) && <h5 className="color-forHeadings">No data on this date</h5>} */}
              {data &&
                Object.keys(data).map((account, index) => {
                  console.log("account:::", account);
                  console.log("index", index);
                  return (
                    <>
                      <div className="dashcard-table">
                        <div className="">
                          {console.log(
                            "data length::::",
                            data[account]?.data?.length
                          )}
                          {data[account]?.data?.length ? (
                            <Table
                              key={index}
                              accountData={data[account]}
                              account={account}
                            />
                          ) : (
                            "No Data to show"
                          )}
                        </div>
                      </div>
                    </>
                  );
                })}
            </>
          ) : (
            <h5 className="color-forHeadings ">Select Date</h5>
          )}
        </div>
      </div>
    </>
  );
};
export default HistoryDashboard;
