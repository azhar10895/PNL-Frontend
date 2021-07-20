import React, { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/dashboard.css";
import { getApiCall, getApiCallWithHeader } from "../../utils/axios";
import { API_URLS } from "../../config";
import Table from "./Table";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getPNL();
  }, []);
  const history = useHistory();

  useEffect(() => {}, [data]);

  const logout = () => {
    localStorage.removeItem("token");
    history.push('/');
  }

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
      <div className="row p-3 g-0">
        <div className="col-12 dashcard mt-2 align-top">
          <div className="row">
            <div className="col-11">
              <h2 className="color-forHeadings text-left">Dashboard</h2>
            </div>
            <div className="col-1">
              <h3 onClick={logout} className="float-end cursor-">Logout</h3>
            </div>
          </div>
        </div>
        <div className="dashcard table-section align-top mt-3">
          <div className="col-12 ">
            {data?.length ? <Table data={data} /> : "No Data to show"}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
