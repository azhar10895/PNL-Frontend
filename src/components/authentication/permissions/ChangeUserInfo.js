import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { API_URLS } from "../../../config";
import { getApiCall, postApiCall } from "../../../utils/axios";
import "../styles/permissions.css";
import { userCreatedIcon } from "../../../helpers/icons";

//Changes needed
const ChangeUserInfo = (props) => {
  const currentUser = props.currentUser;
  const data=props.data;
  const id=props.id;
  const [roleId,setRoleId]=useState({});
  const [passBool, setPassBool] = useState(false);
  const [roles, setRoles] = useState([]);
  console.log("sikkim", data);

  useEffect(() => {
    getRoles();
  }, []);
  const getRoles = async () => {
    try {
      const res = await getApiCall(API_URLS.getRoles,{});
      const roles = res?.res?.users
        ? res?.res?.users.map((item) => {
            return item.RoleName;
          })
        : [];
      const roleId = {};
      res?.res?.users.forEach(role => {
        roleId[role.RoleName] = role.RoleId;
      });
      setRoleId({...roleId});
      setRoles([...roles]);
    } catch (err) {
      console.log("Error in getRoles ", err);
    }
  };
  const editUserCall = async (values) => {
    try {
      console.log("roleID:::",roleId[values.role]);
      const res = await postApiCall(
        API_URLS.modifyUsers,
        {},
        {
          username: values.username,
          password: values.password,
          accountNo: values.accountNo,
          emailId: values.email,
          role: roleId[values.role], //this needs change
          userId: 1,
        }
      );
      console.log("Res data", res);
    } catch (err) {
      console.log("Err in edit user modifyAPi ", err);
    }
  };
  const initialValues = {
    // username: currentUser,
    // accountNo: data[currentUser].accountNo,
    // email: data[currentUser].email,
    // password:data[currentUser].password,
    // role: "",
    username: currentUser,
    accountNo: data[id].accountNo,

    email: data[id].emailId,
    password: "",
    role: data[id].RoleName,
  };

  const onSubmit = (values, { resetForm }) => {
    console.log("formData::", values);
    //apiCall
    if (values) {
      editUserCall(values);

      resetForm({ values: "" });
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return (
    <>
      <div className="HeadingAddNewUser">Update User</div>
      <div className="UpdateUserPopup">
      <form onSubmit={formik.handleSubmit}>
      
        <div className="editUserFormField">
          <input
            type="text"
            id="Username"
            className="InputclassofAdduser"
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
            className="InputclassofAdduser"
            name="accountNo"
            placeholder="Account No"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.accountNo}
            // value={data[id].accountNo}
          />
        </div>
        <div className="editUserFormField">
          <input
            type="text"
            id="email"
            className="InputclassofAdduser"
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
        {passBool && (
          <div className="editUserFormField">
            <input
              type="password"
              id="password"
              name="password"
              className="InputclassofAdduser"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              // value={data[0].password}
            />
            {/* <div className="col-12">
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div> */}
          </div>
        )}
        <div className="AddNewUserRoles">
          <select
            name="role"
            className="InputclassofAdduser"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="role" label="Select role" />
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

        
        {/* <label htmlFor="passBool" className="labell">
    <div className="togggle">
      <input className="togggle-state" type="checkbox" name="check" value="check
            onClick={() => setPassBool(true)/>
      <div className="indicator"></div>
    </div>
    <div className="labell-text">password</div>
          </label> */}
          



          <div className="overallCheckbox">
          <input
            type="checkbox"
            
            className="PassBoolcheckbox"
            id="passBool"
            onClick={() => setPassBool(!passBool)}
          />
          <label htmlFor="passBool" className="">
          </label>
        </div>


        <div className="UpdateuserrButtonOuter">
          <button type="submit" className="UpdateUserSubmitButton">
            Change
          </button>
        </div>
      </form>
      </div>
      
    </>
  );
};
export default ChangeUserInfo;
