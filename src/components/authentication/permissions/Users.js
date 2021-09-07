import React, { useEffect, useState } from "react";
import ChangeUserInfo from "./ChangeUserInfo";
import AddNewUser from "./AddNewUser";
import { getApiCall } from "../../../utils/axios";
import { API_URLS } from "../../../config";
import "bootstrap-icons/font/bootstrap-icons.css";

const Users = () => {
  const [toggle, setToggle] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [addNewUserBool, setAddNewUserBool] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await getApiCall(API_URLS.getUsers, {});
    const data = res?.res?.users;
    console.log("data::::", data);
    setData({ ...data });
  };

  const addNewUserHandler = () => {
    setAddNewUserBool(true);
    setToggle(!toggle);
  };

  const editHandler = (event) => {
    setAddNewUserBool(false);
    setCurrentUser(event.target.value);
    setId(event.target.id);
    setToggle(!toggle);
    console.log(event.target.id, "arunachal");
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
            <div className="col-4 permissionHeading"><strong>Username</strong></div>
            <div className="col-3 permissionHeading"><strong>Role</strong></div>
            <div className="col-3 permissionHeading"><strong>Last Login</strong></div>
          </div>
          {Object.keys(data).map((user) => {
            return (
              <React.Fragment key={data[user].userId}>
                <div className="row permissionPage-row">
                  
                  <div className="col-4 th">{data[user]?.userName}</div>
                  <div className="col-3 th">{data[user]?.RoleName}</div>
                  <div className="col-3 th">
                    {data[user]?.lastLogin ? data[user]?.lastLogin : "-"}
                  </div>
                  <div className="col-2">
                    <div className="float-end">
                      {/* <div style={{cursor: "pointer"}}> */}
                      
                      <div style={{cursor: "pointer"}}>
                        
                      <i class="bi bi-pencil-fill"
                      style={{'font-size': "0.95rem"}}
                      value={data[user]?.userName}
                      name={data[user]?.userName}
                      id={user}
                      onClick={editHandler}>
                      </i>
                        {/* Edit */}
                        {/* <Icon.PencilFill color="white" size={30} /> */}
                      </div>
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
                data={data}
                id={id}
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
