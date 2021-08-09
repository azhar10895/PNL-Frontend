import React, { useState } from "react";
import NavigationEveryPage from "../../Nav/NavigationEveryPage";
const HistoryDashboard = () => {
  const onDateChangeFunc = (date) => {
    //apiCall
    console.log(date);
  }
  
  return (
    <>
      <div className="dashboardPage">
        <div className="navigation">
          <NavigationEveryPage pageName="History" onDateChangeFunc={onDateChangeFunc}/>
        </div>
        <div>
        </div>
      </div>
    </>
  );
};
export default HistoryDashboard;
