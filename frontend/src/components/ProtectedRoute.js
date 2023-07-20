import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return props.loggedIn === true ? (
    <Component {...props} />
  ) : (
    <Navigate to="/sign-in" replace />
  );
};

export default ProtectedRoute;
