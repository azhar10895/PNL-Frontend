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
    document.getElementById("editUser").checked = false;
  };
  const editUserButtonHandler = () => {
    setEditUserBool(!editUserBool);
    setAddNewUserBool(false);
    document.getElementById("addUser").checked = false;
  };
  return (
    <>
      <div className="PermissionsPage">
        <div className="PermissionsBar">
          <NavigationEveryPage pageName="Permissions" />
        </div>
        <div className="buttons">
          <div className="">
          <label htmlFor="addUser">Add New User</label>
          <label className="switch">
            <input type="checkbox" id="addUser" onClick={addNewUserButtonHandler} defaultChecked/>
            <span class="slider round" style={{marginLeft:'0px'}}></span>
            </label>
          </div>
          <div className="">
          <label htmlFor="editUser">Edit User</label>
            <label className="switch">
            <input type="checkbox" id="editUser" onClick={editUserButtonHandler} />
            <span class="slider round" style={{marginLeft:'0px'}}></span>
            </label>
          </div>
        </div>
        <div>{addNewUserBool ? <AddNewUser /> : null}</div>
        <div>{editUserBool ? <EditUserPermission /> : null}</div>
      </div>
    </>
  );
};
export default Permissions;
