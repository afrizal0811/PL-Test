import * as React from "react";
import { Navigate } from "react-router-dom";

import { isValidToken } from "../../utils/jwt";

// For routes that can only be accessed by authenticated users
function AuthGuard({ children }) {
  const token = window.localStorage.getItem("accessToken");
  const exp = window.localStorage.getItem("expFE");

  if (!token || !isValidToken(exp)) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("branch");
    localStorage.removeItem("branches");
    localStorage.removeItem("userName");
    localStorage.removeItem("employeeName");
    localStorage.removeItem("roleName");
    localStorage.removeItem("employeeID");
    localStorage.removeItem("expFE");
    return <Navigate to="/auth/sign-in" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
