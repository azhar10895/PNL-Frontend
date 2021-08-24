import React, { useEffect, useState } from "react";
import ChangeUserInfo from "./ChangeUserInfo";
import AddNewUser from "./AddNewUser";
import { getApiCall } from "../../../utils/axios";
import { API_URLS } from "../../../config";

const Users = () => {
  const [toggle, setToggle] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [addNewUserBool, setAddNewUserBool] = useState(false);
  const [data,setData] = useState([]);
  const [id,setId] = useState(null);
  useEffect(()=>{
    getUsers();
  },[])
  const getUsers = async()=>{
    const res = await getApiCall(API_URLS.getUsers,{});
    const data = res?.res?.users;
    console.log("data::::",data);
    setData({...data});
  }
  const addNewUserHandler = () => {
    setAddNewUserBool(true);
    setToggle(!toggle);
  };
  
  const editHandler = (event) => {
    setAddNewUserBool(false);
    setCurrentUser(event.target.value);
    setId(event.target.id);
    setToggle(!toggle);
    console.log(event.target.id , "arunachal");
    
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
              <React.Fragment key={data[user].userId}>
                <div className="row permissionPage-row">
                  <div className="col-4">{data[user]?.userName}</div>
                  <div className="col-3">{data[user]?.RoleName}</div>
                  <div className="col-3">{data[user]?.lastLogin?data[user]?.lastLogin:'-'}</div>
                  <div className="col-2">
                    <div className="float-end">
                      <button
                        type="button"
                        className="btn btn-success"
                        value={data[user]?.userName}
                        name={data[user]?.userName}
                        id={user}
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
