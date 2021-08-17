import React, { useEffect, useState } from "react";
import axios from "axios";
import { getApiCall, postApiCall } from "../../../utils/axios";
import { API_URLS } from "../../../config/index";
import Select from "react-select";
import "../styles/settings.css";
import NavigationEveryPage from "../../Nav/NavigationEveryPage";
import { useFormik } from "formik";
import { Redirect } from "react-router";

 const Permissions = () => {
    return (
        <>
        <div className="PermissionsPage container">
        <div>
            <NavigationEveryPage pageName="Permissions" />
          </div>
        <div>
            <input placeholder=" new page created" />
        </div>
        </div>
        </>
    )
}
export default Permissions;