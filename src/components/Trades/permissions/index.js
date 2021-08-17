import React, { useEffect, useState } from "react";
import { API_URLS } from "../../../config/index";
import Select from "react-select";
import "../styles/permissions.css";
import NavigationEveryPage from "../../Nav/NavigationEveryPage";
import { Redirect } from "react-router";

const Permissions = () => {
  return (
    <>
      <div className="PermissionsPage">
        <div className="PermissionsBar">
          <NavigationEveryPage pageName="Permissions" />
        </div>
        <div>
          <input placeholder=" new page created" />
        </div>
      </div>
    </>
  );
};
export default Permissions;
