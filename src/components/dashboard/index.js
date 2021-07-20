import React, { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/dashboard.css";
import { getApiCall, getApiCallWithHeader } from "../../utils/axios";
import { API_URLS } from "../../config";

const Dashboard = () => {
  useEffect(() => {
    
    getPNL();
  }, []);

  const getPNL = async () => {
    try {
      const token = localStorage.getItem("token");
      const header = {
        authorization: `Bearer ${token}`,
      };
      const res = await getApiCallWithHeader(API_URLS.getPNL, {}, header);
      console.log("API res", res);
    } catch (err) {
      console.log("Error in GetPNL", err);
    }
  };
  return (
    <div className="dashcard align-top">
      <div className="row p-3">
        <div className="col-12 ">
          <h2 className="color-forHeadings text-left">Dashboard</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
