import React, { useState } from "react";
import { useFormik } from "formik";
import { API_URLS } from "../../../config";
import { postApiCall } from "../../../utils/axios";
import { userCreatedIcon } from "../../../helpers/icons";

//validation needs change
//validation on password
//roles api should be there to get roles

const AddNewUser = (props) => {
  const roles = ["Trader", "setter"];
  const [userCreated, setUserCreated] = useState(false);
  const initialValues = {
    username: "",
    accountNo: "",
    email: "",
    password: "",
    role: "",
  };
  const newUser = async (values) => {
    try {
      const res = await postApiCall(
        API_URLS.modifyUsers,
        {},
        {
          username: values.username,
          password: values.password,
          accountNo: values.accountNo,
          emailId: values.email,
          role: 1, //this needs change
        }
      );
      if (res?.request?.statusText === "Created") {
        setUserCreated(true);
      }
    } catch (err) {
      console.log("Error in modify add new user", err);
    }
  };
  const validate = (values) => {
    let errors = {};
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.accountNo) {
      errors.accountNo = "Account No is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (!values.role) {
      errors.role = "Role is required";
    }
    return errors;
  };
  const onSubmit = (values, { resetForm }) => {
    console.log("formData::", values);
    newUser(values);
    resetForm({ values: "" });
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  return (
    <>
      {!userCreated && (
        <form onSubmit={formik.handleSubmit}>
          <div className="editUserFormField">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
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
          <div className="editUserFormField">
            <input
              type="text"
              id="accountNo"
              name="accountNo"
              placeholder="Account No"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.accountNo}
            />
            <div className="col-12">
              {formik.touched.accountNo && formik.errors.accountNo ? (
                <div className="error">{formik.errors.accountNo}</div>
              ) : null}
            </div>
          </div>
          <div className="editUserFormField">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <div className="col-12">
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
            </div>
          </div>
          <div className="editUserFormField">
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
          <div className="editUserFormField">
            <select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" label="Select role" />
              {roles.map((role) => {
                return <option value={role} label={role} key={role} />;
              })}
            </select>
            <div className="col-12">
              {formik.touched.role && formik.errors.role ? (
                <div className="error">{formik.errors.role}</div>
              ) : null}
            </div>
          </div>
          <div className="editUserFormField">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      )}
      {userCreated && (
        <div className="userCreated">
          <div className="icon">{userCreatedIcon}</div>
          <div className="successText">User Created Successfully</div>
        </div>
      )}
    </>
  );
};
export default AddNewUser;
