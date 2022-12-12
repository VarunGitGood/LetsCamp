import { Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import NavBar from "../components/UI/NavBar";
import s from "../styles/Profile.module.css";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const auth = useContext(AuthContext);
  const userD = useContext(UserContext).user;
  const nav = useNavigate();

  return (
    <>
      <NavBar />
      <div className={s.profile}>
        <div className={s.grad}>
          <div className={s.bg}>
            <div className={s.avatar}>
              <img src="https://i.pravatar.cc/300" alt="avatar" />
            </div>
          </div>
        </div>
        {userD && (
          <div className={s.det}>
            <div className={s.name}>{userD.name}</div>
            <div className={s.date}>Joined on: {userD.createdAt}</div>
            <div className={s.role}>Role: {userD.role}</div>
            <div className={s.email}>Email: {userD.email}</div>
          </div>
        )}
        <Button
          variant="contained"
          onClick={() => {
            auth.logout();
            nav("/");
          }}
        >
          Logout
        </Button>
      </div>
    </>
  );
}

export default Profile;
