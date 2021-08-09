import React, { useState } from "react";
import NavigationEveryPage from "../../Nav/NavigationEveryPage";
import { postApiCall } from "../../../utils/axios";
import { API_URLS } from "../../../config";
import Table from "../dashboard/Table"
const HistoryDashboard = () => {
  const [data,setData] = useState([])
  const onDateChangeFunc = (date) => {
    const d = date;
    const newDate = (d.getFullYear())+'-'+((d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1))+'-'+(d.getDate()<10?'0'+d.getDate():d.getDate());
    console.log(newDate);
    getHistoricData(newDate);
  };
  const getHistoricData = async (date) => {
    const res = await postApiCall(
      API_URLS.getHistoricData,
      {},
      { date: date }
    );
    const data = res?.data?.res;
    setData({...data});
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
          {data &&
            Object.keys(data).map((account) => {
              console.log("account:::", account);
              return (
                <>
                  <div className="dashcard-table">
                    <div className="">
                      {data[account]?.data?.length ? (
                        <Table
                          accountData={data[account]}
                          account={account}
                          key={account}
                        />
                      ) : (
                        "No Data to show"
                      )}
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default HistoryDashboard;
