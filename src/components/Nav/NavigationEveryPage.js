import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Trades/styles/dashboard.css";
import "./Navbar.css";
// import SearchTable from "./SearchTable";
import Navbar from "./Navbar";
import * as Icon from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NavigationEveryPage = (props) => {
  const [date, setDate] = useState(new Date());
  const onDateChange = (date) => {
    // console.log(date);
    setDate(date);
    props.onDateChangeFunc(date);
  };

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
      <div className="container-fluid">
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
              {pageName === "History" ? (
                <>
                  <div className="item-3-icon">
                    <Icon.CalendarFill color="white" size={20} />
                  </div>
                  <div>
                    <DatePicker
                      onChange={onDateChange}
                      selected={date}
                      dateFormat="dd-MM-yyyy"
                    />
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="navigationPageItem">
            <div className="item-4">
              <div className="arrowDropdown container d-flex justify-content-between align-items-center my-dropdown">
                <div className="dropdown">
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
