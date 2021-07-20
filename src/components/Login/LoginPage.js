import React from "react";
import { useFormik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/LoginPage.css";

const initialValues = {
  username: "",
  password: "",
};

const onSubmit = (values) => {
  console.log("form data", values);
};

const validate = (values) => {
  let errors = {};
  if (!values.username) {
    errors.username = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  return errors;
};

function LoginPage() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div className=" my-container">
      <div className="header middle">
        <h2 className="color-forHeadings">Log In to your Account</h2>
      </div>

      <form onSubmit={formik.handleSubmit} className="myForm">
        <div className="row my-row">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error">{formik.errors.username}</div>
          ) : null}
        </div>
        <div className="row my-row">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="row-12">
          <button type="submit" className="btn col-12 my-btn">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
