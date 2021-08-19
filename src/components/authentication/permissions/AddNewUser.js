import React, { useEffect, useState } from 'react';
import NavigationEveryPage from "../../Nav/NavigationEveryPage";


const AddNewUser = () => {
    const [newUser, setNewUser] = useState(null);
  //   const [data,setNewData] =useState({});
  const pages = [
    "dashboard",
    "permissions",
    "history",
    "tradesLogs",
    "settings",
  ];
  const data = {
    admin: ["dashboard", "permissions", "history", "tradesLogs", "settings"],
    User1: ["dashboard", "history"],
    user2: ["settings", "history"],
  };

  const newUserInputHandler = (event) => {
    setNewUser(event.target.value);
  };

  //   const addNewUserHandler = () => {
  //     data[newUser] = "hello";
  //   };
  const addNewUser = (event) => {
    event.preventDefault();
    const newUserObject = {};
<<<<<<< HEAD:src/components/Trades/permissions/index.js
    const permissions  = [];
    const values = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map((item) => {
        permissions.push(item.value);
=======
    const permissions = [];
    Array.from(
      document.querySelectorAll("input[type=checkbox]:checked")
    ).forEach((item) => {
      permissions.push(item.value);
>>>>>>> a7ea60a43c24e419e95edb62c385b8dce7ef000b:src/components/authentication/permissions/AddNewUser.js
    });
    // console.log(permissions)
    newUserObject[newUser] = permissions;
    console.log(newUserObject);
    //apiCall
  };

  return (
    <>
        <form>
          <div>
            <input placeholder="Add new user" onChange={newUserInputHandler} />
            <div>
              {pages.map((page) => {
                return (
                  <div>
                    <input type="checkbox" id={page} value={page} />
                    <label htmlFor={page}>{page}</label>
                  </div>
                );
              })}
            </div>
            <button type='reset'>Reset</button>
            <button onClick={addNewUser}>Add new user</button>
          </div>
        </form>
        {/* <div>
          {Object.keys(data).map((user) => {
            return (
              <>
                <div>{user}</div>
                <div>
                  {data[user].map((page) => {
                    return (
                      <>
                        <li>
                          <input type="checkbox" id={page} />
                          <label htmlFor={page}>{page}</label>
                        </li>
                      </>
                    );
                  })}
                </div>
                <br />
              </>
            );
          })}
        </div> */}
    </>
  );
}

export default AddNewUser;