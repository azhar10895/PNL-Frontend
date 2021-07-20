import React from "react";
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component, auth, ...rest }) => {
    const token = sessionStorage.getItem("token");
    if(token){
        
    } else{
        return <Redirect to="/" />;
    }
  <Route
    {...rest}
    render={(props) =>
      auth === true ? <Component {...props} /> : <Redirect to="/" />
    }
  />
};

export default GuardedRoute;
