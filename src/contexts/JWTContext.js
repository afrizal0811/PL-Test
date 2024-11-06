import { createContext, useEffect, useReducer } from "react";

import axios from "axios";
import { isValidToken, setSession } from "../utils/jwt";

const API_URL = process.env.REACT_APP_DOMAIN_API;

const INITIALIZE = "INITIALIZE";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const SIGN_UP = "SIGN_UP";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  token: null,
};

const JWTReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };

    case SIGN_UP:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        const expFE = window.localStorage.getItem("expFE");

        if (accessToken && isValidToken(expFE)) {
          // setSession(accessToken);

          // const response = await axios.get("/api/auth/my-account");
          // const { user } = response.data;
          const user = window.localStorage.getItem("userName");

          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
              token: accessToken,
            },
          });
        } else {
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
              token: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
            token: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const signIn = async (username, password) => {
    const response = await axios.post(API_URL + "/Auth/Login", {
      username,
      password,
    });
    const {
      token,
      branchID,
      branches,
      employeeID,
      employeeName,
      roleName,
      accesRightID,
    } = response.data;

    if (branches.find((x) => x.branchID === branchID) === undefined) {
      window.localStorage.setItem("branch", branches?.[0]?.branchID);
    } else {
      window.localStorage.setItem("branch", branchID);
    }
    setSession(token);
    window.localStorage.setItem("branches", JSON.stringify(branches));
    window.localStorage.setItem("employeeName", employeeName);
    window.localStorage.setItem("roleName", roleName);
    window.localStorage.setItem("employeeID", employeeID);
    window.localStorage.setItem("accesRightID", accesRightID);

    dispatch({
      type: SIGN_IN,
      payload: {
        user: response.data,
        token: token,
      },
    });
  };

  const signOut = async () => {
    setSession(null);
    dispatch({ type: SIGN_OUT });
  };

  const signUp = async (email, password, firstName, lastName) => {
    const response = await axios.post("/api/auth/sign-up", {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem("accessToken", accessToken);
    dispatch({
      type: SIGN_UP,
      payload: {
        user,
      },
    });
  };

  const resetPassword = async (email) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_DOMAIN_API}/Auth/ResetPassword`,
        { Username: email },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        signIn,
        signOut,
        signUp,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
