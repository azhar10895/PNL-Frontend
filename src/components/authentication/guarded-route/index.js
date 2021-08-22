import React from "react";
import { Route, Redirect } from "react-router-dom";
import { auth } from "../../../helpers/auth";

const GuardedRoute = ({ component: Component, componentIndex, ...rest }) => {
  const isAuth = auth(componentIndex); //logic
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component {...props} />;
        } else {
          return (
            <>
              <Redirect to="/" />
            </>
          );
        }
      }}
    />
  );
};

export default GuardedRoute;
