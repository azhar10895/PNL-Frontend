import React from "react";
import { useFormik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import OtpClass from "./OtpClass";
import './styles/SignUpForm.css'

const initialValues = {
  username: "",
  firstname: "",
  lastname: "",
  email: "",
};

const onSubmit = (values) => {
  console.log("form data", values);
};

const validate = (values) => {
  let errors = {};
  if (!values.firstname) {
    errors.firstname = "Required";
  } else if (
    !/^(?=.{2,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i.test(
      values.firstname
    )
  ) {
    errors.firstname = "invalid firstname";
  }
  if (!values.lastname) {
    errors.lastname = "Required";
  } else if (
    !/^(?=.{2,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i.test(
      values.lastname
    )
  ) {
    errors.lastname = "invalid lastname";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email";
  }
  if (!values.username) {
    errors.username = "Required";
  }
  return errors;
};

function SignupForm() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  //console.log('FormValues:', formik.values)

  return (
    <div className="container-7 my-container">
      <div className="middle">
        <h1 className="color-forHeadings">Create Account</h1>
        <p className="color-forSmallText">
          Already have an account?<a href=" "> Sign in </a>
        </p>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="row-12 my-row">
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
        <div className="row">
          <div className="col-sm-6 my-row">
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="First Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
            />
            {formik.touched.firstname && formik.errors.firstname ? (
              <div className="error">{formik.errors.firstname}</div>
            ) : null}
          </div>
          <div className="col-sm-6 my-row">
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Last Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
            />
            {formik.touched.lastname && formik.errors.lastname ? (
              <div className="error">{formik.errors.lastname}</div>
            ) : null}
          </div>
        </div>
        <div className="row-12 my-row">
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="row-12 my-row">
          <OtpClass />
        </div>
        <button type="submit" className="btn col-12 my-btn">
          Sign Up{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-right-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
