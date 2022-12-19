import React, { createContext, useEffect, useState } from "react";
import { FetchData } from "../utils/REST";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      if (window.localStorage.getItem("token")) {
        const userDetails = await FetchData(
          "/auth/me",
          true,
          window.localStorage.getItem("token")
        );
        setUser(userDetails.data.data);
      }
    } catch (error) {
      window.alert("invalid token");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const ctx = {
    user: user,
    fetchUser,
  };

  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>;
}
