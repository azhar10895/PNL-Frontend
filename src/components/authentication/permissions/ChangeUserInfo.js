import React, { useState } from "react";
import { useFormik } from "formik";
import { API_URLS } from "../../../config";
import { postApiCall } from "../../../utils/axios";
const ChangeUserInfo = (props) => {
  const addNewUser = props.addNewUser;
  const [currentUser, setCurrentUser] = useState(props.currentUser);
  const roles = ["Trader", "setter"];
  const editUserCall = async () =>{
    try{
      const res = await postApiCall(API_URLS.modifyUsers,{},{});
      console.log("Res data",res);
    }catch(err){
      console.log("Err in edit user modifyAPi ",err);
    }
  }
  const initialValues = {
    username: currentUser,
    accountNo: "", //needs change
    email: "", //needs change
    password: "", //needs change
    role: "", //needs change
  };
  const validate = (values) => {
    //needs change
    let errors = {};
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
    setCurrentUser(values.username);
    resetForm({ values: "" });
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="editUserFormField">
          <input
            type="text"
            id="Username"
            name="Username"
            placeholder="Username"
            // onChange={formik.handleChange}
            readOnly={true}
            // onBlur={formik.handleBlur}
            value={currentUser}
          />
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
        </div>
        <div className="editUserFormField">
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {/* <div className="col-12">
            {formik.touched.username && formik.errors.username ? (
              <div className="error">{formik.errors.username}</div>
            ) : null}
          </div> */}
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
          {/* <div className="col-12">
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div> */}
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
          {/* <div className="col-12">
            {formik.touched.role && formik.errors.role ? (
              <div className="error">{formik.errors.role}</div>
            ) : null}
          </div> */}
        </div>
        <div className="editUserFormField">
          <button type="submit" className="btn btn-primary">
            Change
          </button>
        </div>
      </form>
    </>
  );
};
export default ChangeUserInfo;
