import React,{useState} from "react";
import { useFormik } from "formik";

const ChangeUserInfo = (props) => {
  const [currentUser,setCurrentUser] = useState(props.currentUser);
  const roles = ["Trader", "setter"];
  const initialValues = {
    username: "",
    password: "",
    role: "",
  };
  const validate = (values) => {
    let errors = {};
    if (!values.username) {
      errors.username = "Username is required";
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
      <div className="row">
        <div className="col-8">
          <div className="userNameHeading">{currentUser}</div>
        </div>
        <div className="col-4">
          <div className="goBack">
            <button onClick={props.goBackHandler}>Go Back</button>
          </div>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="editUserFormField">
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
            Change
          </button>
        </div>
      </form>
    </>
  );
};
export default ChangeUserInfo;
