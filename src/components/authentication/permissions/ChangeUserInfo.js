import React from "react";
import { useFormik } from "formik";

const ChangeUserInfo = (props) => {
  const currentUser = props.currentUser;
  const initialValues = {
    username: "",
    password: "",
  };
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
  const onSubmit = (values, { resetForm }) => {
    console.log("formData::", values);
    resetForm({ values: "" });
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  return (
    <>
      <div className="userNameHeading">{currentUser}</div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Change Username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          <div className="col-12">
            {formik.touched.username && formik.errors.username ? (
              <div className="error">{formik.errors.username}</div>
            ) : null}
          </div>
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <div className="col-12">
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Tick
          </button>
        </div>
      </form>
    </>
  );
};
export default ChangeUserInfo;
