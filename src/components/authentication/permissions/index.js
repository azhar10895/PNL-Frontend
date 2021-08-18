import React, { useEffect, useState } from "react";
import { API_URLS } from "../../../config/index";
import Select from "react-select";
import "../styles/permissions.css";
import NavigationEveryPage from "../../Nav/NavigationEveryPage";
import { Redirect, useHistory } from "react-router-dom";
import AddNewUser from "./AddNewUser";
import { EditUserPermission } from "./EditUserPermission";

const Permissions = () => {
  const [addNewUserBool, setAddNewUserBool] = useState(true);
  const [editUserBool, setEditUserBool] = useState(false);
  const addNewUserButtonHandler = () => {
    setAddNewUserBool(!addNewUserBool);
    setEditUserBool(false);
  };
  const editUserButtonHandler = () => {
    setEditUserBool(!editUserBool);
    setAddNewUserBool(false);
  };
  return (
    <>
      <div className="PermissionsPage">
        <div className="PermissionsBar">
          <NavigationEveryPage pageName="Permissions" />
        </div>
        <div className="buttons">
          <div className="">
            <button onClick={addNewUserButtonHandler}>Add New User</button>
          </div>
          <div className="">
            <button onClick={editUserButtonHandler}>Edit User</button>
          </div>
        </div>
        <div>{addNewUserBool ? <AddNewUser /> : null}</div>
        <div>{editUserBool ? <EditUserPermission /> : null}</div>
      </div>
    </>
  );
};
export default Permissions;
