import React, { createContext, useContext, useEffect, useState } from "react";
import { FetchData, postData } from "../utils/REST";
import { UserContext } from "./UserContext";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const User = useContext(UserContext);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  const SignUpHandler = async (data) => {
    try {
      const result = await postData("/auth/register", false, null, data);
      window.localStorage.setItem("token", result.data.token);
      setToken(result.data.token);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const loginHandler = async (data) => {
    try {
      const result = await postData("/auth/login", false, null, data);
      window.localStorage.setItem("token", result.data.token);
      User.fetchUser();
      setToken(result.data.token);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const logoutHandler = () => {
    window.localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      if(token) {
      const userDetails = await FetchData("/auth/me", true, window.localStorage.getItem("token"));
      setUser(userDetails.data.data);}
    } catch (error) {
      window.alert("invalid token");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  const ctx = {
    user: user,
    fetchUser: fetchUser,
    login: loginHandler,
    logout: logoutHandler,
    signup: SignUpHandler,
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
}
