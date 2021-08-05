import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Trades/styles/dashboard.css";
import "./Navbar.css";
// import SearchTable from "./SearchTable";
import Navbar from "./Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import { icons } from "react-icons/lib";
import Trades from "../Trades/TradesLogs/index";
import Dashboard from "../Trades/dashboard";
import { useHistory } from "react-router-dom";
import LoginPage from "../authentication/Login/LoginPage";

const NavigationEveryPage = (props) => {
  const pageName = props.pageName;
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };
  const settingsHandler = () => {
    history.push("/settings");
  };
  return (
    <>
      <div className="container">
        <div className="navigationPage">
          <div className="navigationPageItem">
            <div className="item-1">
              <Navbar />
            </div>
          </div>
          <div className="navigationPageItem">
            <div className="color-forHeadings item-2">{pageName}</div>
          </div>
          <div className="navigationPageItem">
            <div className="item-3">
              <div className="arrowDropdown container d-flex justify-content-between align-items-center my-dropdown">
                <div class="dropdown">
                  <span className="Logout">
                    <Icon.CaretDownFill color="#4a5f94" size={30} />
                  </span>
                  <div className="dropdown-content">
                    <ul>
                      <li>
                        <Icon.PersonFill size={25} />
                        &nbsp;Admin Profile
                      </li>
                      <li onClick={settingsHandler}>
                        <Icon.Gear />
                        &nbsp;Settings
                      </li>
                      <li>
                        <Icon.ClockHistory />
                        &nbsp;User history
                      </li>
                      <li className="dropdown_elements" onClick={logout}>
                        <Icon.BoxArrowRight />
                        &nbsp;Logout
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default NavigationEveryPage;
