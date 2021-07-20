import React, { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/dashboard.css";
import { getApiCall } from "../../utils/axios";
import { API_URLS } from "../../config";
import Table from "./Table";
import { useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getPNL().then((data) => {
      console.log("data:::::", data);
    })
  }, []);  
  console.log("Hello this is data",data);
  const getPNL = async () => {
    try {
      const res = await getApiCall(API_URLS.getPNL);
      return res;
    } catch (err) {
      console.log("Error in GetPNL", err);
    }
  };
  return (
    <div className="dashcard align-top">
      <div className="row p-3">
        <div className="col-12 ">
          <h2 className="color-forHeadings text-left">Dashboard</h2>
          {/* <Table /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
