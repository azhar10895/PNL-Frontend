import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/LoginPage.css";
import { postApiCall } from "../../utils/axios";
import { API_URLS } from "../../config";
import { Redirect } from "react-router-dom";

const LoginPage = () => {
  const initialValues = {
    username: "",
    password: "",
  };
  const [redirectToDashboard, setredirectToDashboard] = useState(false);

  const onSubmit = async (values) => {
    try {
      console.log("form data", values);
      if (values?.username && values?.password) {
        const res = await postApiCall(API_URLS.login, {}, values);
        if (res?.data?.res?.login === "success") {
          if (res?.data?.res?.token) {
            localStorage.setItem("token", res?.data?.res?.token);
          }
          setredirectToDashboard(true);
        }
        console.log("Res", res);
      }
    } catch (err) {
      console.log("Error", err);
      alert("Invalid username or password");
    }
  };
  useEffect(() => {}, [redirectToDashboard]);

  const validate = (values) => {
    let errors = {};
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <>
      {redirectToDashboard ? (
        <Redirect to="/dashboard" />
      ) : (
        <div className=" my-container mt-5">
          <div className="header middle">
            <h2 className="color-forHeadings">Log In to your Account</h2>
          </div>

          <form onSubmit={formik.handleSubmit} className="myForm">
            <div className="row my-row">
              <div className="col-12">
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
              </div>
              <div className="col-12">
                {formik.touched.username && formik.errors.username ? (
                  <div className="error">{formik.errors.username}</div>
                ) : null}
              </div>
            </div>
            <div className="row g-0 my-row">
              <div className="col-12">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
              <div className="col-12">
                {formik.touched.password && formik.errors.password ? (
                  <div className="error">{formik.errors.password}</div>
                ) : null}
              </div>
            </div>
            <div className="row g-0">
              <div className="col-12">
                <button type="submit" className="btn col-12 my-btn">
                  Log In
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default LoginPage;
