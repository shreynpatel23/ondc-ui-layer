import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoutes({ children, ...props }) {
  const token = localStorage.getItem("token");
  return (
    <Route
      {...props}
      render={() => {
        return token ? children : <Redirect to={{ pathname: "/" }} />;
      }}
    />
  );
}

export default ProtectedRoutes;
