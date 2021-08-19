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
    const permissions = [];
    Array.from(
      document.querySelectorAll("input[type=checkbox]:checked")
    ).forEach((item) => {
      permissions.push(item.value);
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