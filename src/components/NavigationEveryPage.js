
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Trades/styles/dashboard.css";
// import SearchTable from "./SearchTable";
import Navbar from "./Nav/Navbar";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import { icons } from "react-icons/lib";
import Trades from "./Trades/TradesLogs/index";
import Dashboard from "./Trades/dashboard";
import { useHistory } from "react-router-dom";

const NavigationEveryPage = (props) => {
  const pageName = props.pageName;
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };
  const settingsHandler = () =>{
    history.push("/settings")
  }
    return (
        <>
        <div className="container-fluid">
        {/* <div className="d-flex align-items-center"> */}
        <div className="dashcard">
          <div className="row">
            <div className="container d-flex justify-content-between align-items-center">
              <div className="col-1 nav navbar-nav d-flex justify-content-between mx-xl-5 text-center">
                <div className=" col-1 threeLines">
                  <Router>
                    <Navbar />
                    <Switch>
                      <Route exact path="/" component={Dashboard} />
                      <Route exact path="/trades" component={Trades} />
                    </Switch>
                  </Router>
                </div>
              </div>
              <div className="col-1 my-col-1 ">
                <h2 className="DashcardHeading">{pageName}</h2>
              </div>
              <div className="col-9"></div>
              {/* <div className="col-3 SearchBar">
              <input
                className=""
                placeholder="Search"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </div> */}

              <div className="col-1 arrowDropdown container d-flex justify-content-between align-items-center my-dropdown">
                <div class="dropdown navbar-nav ml-auto">
                  <span className="Logout">
                    {/* <Icon.PersonCircle />
                      &nbsp; */}
                    {/* <img src="https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg" className="img-fluid img-thumbnail" alt="userimage" width="50" height="50"/>  */}
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
        </div>
        </>
    )
}

export default NavigationEveryPage
