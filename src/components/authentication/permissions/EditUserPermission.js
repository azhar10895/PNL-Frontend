import React, { useState } from "react";
import Select from "react-select";
import { editIcon } from "../../../helpers/icons";
import * as Icon from "react-bootstrap-icons";
import ChangeUserInfo from "./ChangeUserInfo";
export const EditUserPermission = (props) => {
  const [toggle, setToggle] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const data = {
    user1: { role: "trader", LastLogin: 0 },
    user2: { role: "Setter", LastLogin: 0 },
    user3: { role: "trader", LastLogin: 0 },
    user4: { role: "trader", LastLogin: 0 },
    user5: { role: "trader", LastLogin: 0 },
    user6: { role: "trader", LastLogin: 0 },
    user7: { role: "trader", LastLogin: 0 },
  };
  const editHandler = (event) => {
    setCurrentUser(event.target.value);
    setToggle(!toggle);
  };
  const goBackHandler = ()=>{
    setToggle(!toggle);
  }
  return (
    <>
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>
            x
          </span>
          {!toggle && (
            <div>
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
          )}

          {toggle && <ChangeUserInfo currentUser={currentUser} goBackHandler={goBackHandler}/>}
        </div>
      </div>
    </>
  );
};
