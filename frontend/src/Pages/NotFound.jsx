import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function NotFound() {
  const nav = useNavigate();
  const user = useContext(UserContext).user;
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 400, color: "#6741c7" }} />
        <h1>404</h1>
        <h2>Page Not Found</h2>
        {user ? (
          <button onClick={() => nav("/home")}>Go Back</button>
        ) : (
          <button onClick={() => nav("/")}>Go Back</button>
        )}
      </div>
    </div>
  );
}

export default NotFound;
