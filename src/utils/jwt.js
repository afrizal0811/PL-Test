// import jwtDecode from "jwt-decode";
import { verify, sign } from "jsonwebtoken";
import axios from "./axios";

const isValidToken = (expFE) => {
  if (!expFE) {
    return false;
  }
  // const decoded = jwtDecode(accessToken);
  const currentTime = Date.now();
  const timeLeft = expFE - currentTime;

  // return decoded.exp > currentTime;
  console.log("expFE > currentTime", expFE > currentTime);
  console.log("timeLeft", timeLeft);
  return expFE > currentTime;
};

const handleTokenExpired = (exp) => {
  let expiredTimer;

  window.clearTimeout(expiredTimer);
  const currentTime = Date.now();
  const timeLeft = exp - currentTime;
  console.log(timeLeft);
  expiredTimer = window.setTimeout(() => {
    console.log("expired");
  }, timeLeft);
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken);
    const expFE = Date.now() + 15000000;
    // const expFE = Date.now() + 200000;
    localStorage.setItem("expFE", expFE);
    handleTokenExpired(expFE);
  } else {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accesRightID");
    localStorage.removeItem("branch");
    localStorage.removeItem("userName");
    localStorage.removeItem("expFE");
    delete axios.defaults.headers.common.Authorization;
  }
};

const getBrach = () => {
  return window.localStorage.getItem("branch");
};

const setBranch = (branchID) => {
  return window.localStorage.setItem("branch", branchID);
};

const getBranches = () => {
  return window.localStorage.getItem("branches")
    ? JSON.parse(window.localStorage.getItem("branches"))
    : [];
};

const getEmployee = () => {
  return window.localStorage.getItem("employeeID");
};

const getEmployeeName = () => {
  return window.localStorage.getItem("employeeName");
};

const getRoleName = () => {
  return window.localStorage.getItem("roleName");
};

const getAkses = () => {
  return window.localStorage.getItem("accesRightID");
};

export {
  verify,
  sign,
  isValidToken,
  setSession,
  getBrach,
  getEmployee,
  getEmployeeName,
  getRoleName,
  getAkses,
  getBranches,
  setBranch,
};
