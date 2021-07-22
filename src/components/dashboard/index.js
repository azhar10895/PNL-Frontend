import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/dashboard.css";
import { getApiCall, getApiCallWithHeader } from "../../utils/axios";
import { API_URLS } from "../../config";
import Table from "./Table";
import { useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getPNL();
  }, []);

  useEffect(() => {}, [data]);


  const getPNL = async () => {
    try {
      const token = localStorage.getItem("token");
      const header = {
        authorization: `Bearer ${token}`,
      };
      const res = await getApiCallWithHeader(API_URLS.getPNL, {}, header);
      const resData = res?.res?.data;
      console.log("Res data", resData);
      if (resData.length) {
        setData([...resData]);
      }
      console.log("API res", res);
    } catch (err) {
      console.log("Error in GetPNL", err);
    }
  };

  return (
    <>
        <div className="DashboardContainer m-auto">
        {data?.length ? <Table data={data} /> : "No Data to show"}
        </div>
    </>
  );
};

export default Dashboard;
