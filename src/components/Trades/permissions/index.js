import React, { useEffect, useState } from "react";
import { API_URLS } from "../../../config/index";
import Select from "react-select";
import "../styles/permissions.css";
import NavigationEveryPage from "../../Nav/NavigationEveryPage";
import { Redirect } from "react-router";

const Permissions = () => {
  const [newUser, setNewUser] = useState(null);
  //   const [data,setNewData] =useState({});
  const pages = [
    "dashboard",
    "permissions",
    "history",
    "tradesLogs",
    "settings",
  ];
  const data = {
    admin: ["dashboard", "permissions", "history", "tradesLogs", "settings"],
    User1: ["dashboard", "history"],
    user2: ["settings", "history"],
  };

  const newUserInputHandler = (event) => {
    setNewUser(event.target.value);
  };

  //   const addNewUserHandler = () => {
  //     data[newUser] = "hello";
  //   };
  const addNewUser = () => {
    const newUserObject = {};
    const permissions  = [];
    const values = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map((item) => {
        permissions.push(item.value);
    });
    // console.log(permissions)
    newUserObject[newUser] = permissions;
    console.log(newUserObject);
    //apiCall
  };

  return (
    <>
      <div className="PermissionsPage">
        <div className="PermissionsBar">
          <NavigationEveryPage pageName="Permissions" />
        </div>
        <div>
          <input placeholder="Add new user" onChange={newUserInputHandler} />
          <div>
            {pages.map((page) => {
              return (
                <div>
                  <input type="checkbox" id={page} value={page}/>
                  <label htmlFor={page}>{page}</label>
                </div>
              );
            })}
          </div>
          <button onClick={addNewUser}>Add new user</button>
        </div>
        {/* <div>
          {Object.keys(data).map((user) => {
            return (
              <>
                <div>{user}</div>
                <div>
                  {data[user].map((page) => {
                    return (
                      <>
                        <li>
                          <input type="checkbox" id={page} />
                          <label htmlFor={page}>{page}</label>
                        </li>
                      </>
                    );
                  })}
                </div>
                <br />
              </>
            );
          })}
        </div> */}
      </div>
    </>
  );
};
export default Permissions;
