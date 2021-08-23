import jwt_decode from "jwt-decode";
import { Redirect } from "react-router";
export const logout = () => {
  localStorage.removeItem("token");
};
export const permissionArr = () => {
  const newArr = [];
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const permissions = decoded?.payload?.permissions;
  console.log("decoded:::",decoded);
  const arr = permissions.slice(1, -1);
  const arr2 = arr.split(",");
  arr2.forEach((index) => {
    newArr.push(Number(index));
  });
  return newArr;
};
export const auth = (componentIndex) => {
  try {
    const newArr = permissionArr();
    return newArr.includes(componentIndex);
  } catch (err) {
    console.log("Not authenticated");
    <Redirect to="/" />;
  }
};
