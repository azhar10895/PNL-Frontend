import React from "react";
import { useFormik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";

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
  }
  if (!values.lastname) {
    errors.lastname = "Required";
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
    <div className="container-7 shadow p-3 mb-5 bg-body rounded my-container">
      <div className="middle">
        <h1>Create Account</h1>
        <p>
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
            value={formik.values.phone}
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
        <button type="submit" className="btn btn-primary col-12 my-btn ">
          <h4>Sign up</h4>
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
