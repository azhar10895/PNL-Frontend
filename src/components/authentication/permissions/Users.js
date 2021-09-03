import React, { useEffect, useState } from "react";
import ChangeUserInfo from "./ChangeUserInfo";
import AddNewUser from "./AddNewUser";
import { getApiCall } from "../../../utils/axios";
import { API_URLS } from "../../../config";

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
            <div className="col-4 permissionHeading">Username</div>
            <div className="col-3 permissionHeading">Role</div>
            <div className="col-3 permissionHeading">Last Login</div>
          </div>
          {Object.keys(data).map((user) => {
            return (
              <React.Fragment key={data[user].userId}>
                <div className="row permissionPage-row">
                  <div className="col-4">{data[user]?.userName}</div>
                  <div className="col-3">{data[user]?.RoleName}</div>
                  <div className="col-3">
                    {data[user]?.lastLogin ? data[user]?.lastLogin : "-"}
                  </div>
                  <div className="col-2">
                    <div className="float-end">
                      <div style={{cursor: "pointer"}}>
                      
                      {/* <button
                        type="button"
                        className="BrokerageSubmitButton"
                        value={data[user]?.userName}
                        name={data[user]?.userName}
                        id={user}
                        onClick={editHandler}
                        
                      >
                        Edit */}
                        {/* <Icon.PencilFill color="white" size={30} /> */}
                      {/* </button> */}
                      
                      {/* <svg xmlns="http://www.w3.org/2000/svg" value={data[user]?.userName}
                        name={data[user]?.userName}
                        id={user}
                        onClick={editHandler} width="32" height="32" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg> */}
                      <svg xmlns="http://www.w3.org/2000/svg"  value={data[user]?.userName} name={data[user]?.userName}
                        id={user}
                        onClick={editHandler} width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
</svg>
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
