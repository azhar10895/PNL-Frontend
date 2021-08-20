import React, { useState } from "react";
import Select from "react-select";
import { editIcon } from "../../../helpers/icons";
import * as Icon from "react-bootstrap-icons";
import ChangeUserInfo from "./ChangeUserInfo";
import AddNewUser from "./AddNewUser";

const Users = () => {
  const [toggle, setToggle] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [addNewUserBool, setAddNewUserBool] = useState(false);
  const data = {
    user1: { role: "trader", LastLogin: 0 },
    user2: { role: "Setter", LastLogin: 0 },
    user3: { role: "trader", LastLogin: 0 },
    user4: { role: "trader", LastLogin: 0 },
    user5: { role: "trader", LastLogin: 0 },
    user6: { role: "trader", LastLogin: 0 },
    user7: { role: "trader", LastLogin: 0 },
  };
  const addNewUserHandler = () => {
    setAddNewUserBool(true);
    setToggle(!toggle);
  };
  const editHandler = (event) => {
    setAddNewUserBool(false);
    setCurrentUser(event.target.value);
    setToggle(!toggle);
  };
  const goBackHandler = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <div className="">
        <div>
          <div className="row">
            <div className="addNewUser">
              <button onClick={addNewUserHandler}>Add New User</button>
            </div>
          </div>
          <div className="row headings">
            <div className="col-4">Username</div>
            <div className="col-3">Role</div>
            <div className="col-3">Last Login</div>
          </div>
          {Object.keys(data).map((user) => {
            return (
              <React.Fragment key={user}>
                <div className="row permissionPage-row">
                  <div className="col-4">{user}</div>
                  <div className="col-3">{data[user]?.role}</div>
                  <div className="col-3">{data[user]?.LastLogin}</div>
                  <div className="col-2">
                    <div className="float-end">
                      <button
                        type="button"
                        className="btn btn-success"
                        value={user}
                        name={user}
                        onClick={editHandler}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      {toggle && (
        <div className="popup-box">
          <div className="box">
            <span className="close-icon" onClick={editHandler}>
              X
            </span>
            {addNewUserBool ? (
              <AddNewUser />
            ) : (
              <ChangeUserInfo
                currentUser={currentUser}
                goBackHandler={goBackHandler}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
