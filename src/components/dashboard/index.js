import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/dashboard.css";
import { getApiCall, postApiCallWithHeaders } from "../../utils/axios";
import { API_URLS } from "../../config";
import Table from "./Table";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchTable from "./SearchTable";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/rootReducerAction";
import Searchable from "react-searchable/lib/Searchable";
import Navbar from "../Nav/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Dashboard = () => {
  // const [new_data, setNewData] = useState([]);
  const pnlData = useSelector((state) => state.pnlData);
  useEffect(() => {
    getPNL();
  }, []); //component only mounting
  const timerId = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState({});
  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };
  useEffect(() => {
    // return () => {
    //   setData({ ...pnlData });
    // }
    setData({ ...pnlData });
  }, [pnlData]); //componentDidUpdate

  // const predicate = (data, query) =>
  //   Object.keys(data).includes(query) || Object.values(data).includes(query);

  // const saveFilterPropertiesHandler = (globalFilte, setGlobalFilte) => {
  //   const globalFilter = globalFilte;
  //   const setGlobalFilter = setGlobalFilte;
  //   return [globalFilter, setGlobalFilter];
  // };
  // const globalFilter = saveFilterPropertiesHandler[0];
  // const setGlobalFilter = saveFilterPropertiesHandler[1];
  const getPNL = async (timeStamp = null) => {
    try {
      const token = localStorage.getItem("token");
      // console.log(
      //   "----------------------------------------------------------------"
      // );
      console.log("timestamp:", timeStamp);

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
      //  setData({...pnlData});
      const resData = res?.data?.res;
      const accountId = Object.keys(resData)[0];
      const time = resData[accountId].lastTimeStamp;
      if (timeStamp === null) {
        console.log("No TimeStamp:::::");
        dispatch(actions.fetchApi(resData));
      } else {
        // setData({ ...pnlData });
        console.log("TimeStamp:::::");
        // console.log("mergeapiconsole", resData);
        dispatch(actions.mergeApi(resData));
      }

      sessionStorage.setItem("TimeStamp", time);
      // console.log("time::::", time);
      if (timerId.current === null) {
        console.log("timerid ", timerId.current);
        timerId.current = setInterval(() => getPNL(time), 5000);
        // setInterval(()=> window.location.reload(false),5000);
      }
    } catch (err) {
      console.log("Error in GetPNL", err);
    }
  };
  return (
    <>
      <div className="container-fluid">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
          </Switch>
        </Router>
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
            </div>
            
            <div className="col-2">
            
              

<div class="dropdown">
  <h2><span className="Logout">Logout</span></h2>
{/* <h2><span className="glyphicon glyphicon-menu-down"><img src="https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg" className="rounded float-left img-fluid img-thumbnail" alt="userimage" width="40" height="40"/> Logout<img src="https://www.pngitem.com/pimgs/m/29-297801_bottom-down-arrow-vector-svg-png-icon-free.png" className="rounded float-left img-fluid img-thumbnail" alt="down"width="20" height="20" /></span></h2> */}
  <div className="dropdown-content float-end cursor-pointer">
  <ul>
     
      <li>Admin name</li>
      <li>User profile</li>
      <li>User history</li>
      <li onClick={logout} className="dropdown_elements">Logout</li>
    </ul>
  </div>
</div>

              {/* <h2>
                <button type="button" className="button float-end cursor-">
                  Logout
                </button>
              </h2>
              <div className="dropdownn">
    <ul>
      <li onClick={logout}>Logout</li>
      <li>Option 2</li>
      <li>Option 3</li>
      <li>Option 4</li>
    </ul>
  </div> */}
            </div>
          </div>
        </div>
        {/* <div>
          <Searchable items={data} predicate={predicate}>
            {({ items, query, handleChange }) => (
              <>
                <input type="text" onChange={handleChange} value={query} />

           
              </>
            )}
          </Searchable>
        </div> */}
        <div>
          <div>
            {data &&
              Object.keys(data)
                // .filter((val) => {
                //   if (searchTerm === "") {
                //     return val;
                //   } else if (val === searchTerm) {
                //     return val;
                //   }
                // })
                .map((account) => {
                  // console.log("data[account]?.data", data[account]?.data);
                  return (
                    <div>
                      <div className="dashcard">
                        <div className="">
                          {/* {console.log(
                            "data[account]?.data",
                            data[account]?.data
                          )} */}
                          {data[account]?.data?.length ? (
                            <Table
                              data={data[account]}
                              account={account}
                              key={account}
                              // OnSavefilterProperties = {saveFilterPropertiesHandler}
                            />
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
