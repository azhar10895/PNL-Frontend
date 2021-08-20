import React, { useEffect, useState } from "react";
import { API_URLS } from "../../../config/index";
import Select from "react-select";
import "../styles/permissions.css";
import NavigationEveryPage from "../../Nav/NavigationEveryPage";
import { Redirect, useHistory } from "react-router-dom";
import AddNewUser from "./AddNewUser";
import EditUserPermission from "./EditUserPermission";
import Users from "./Users";

const Permissions = () => {
  const [editUserBool, setEditUserBool] = useState(false);
  return (
    <>
      <div className="PermissionsPage">
        <div className="PermissionsBar">
          <NavigationEveryPage pageName="Permissions" />
        </div>
        <div className="Permissions-body">
          <div class="contentBox">
            <Users />
          </div>
        </div>
      </div>
    </>
  );
};
export default Permissions;
