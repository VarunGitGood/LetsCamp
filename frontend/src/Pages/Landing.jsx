import React, { useContext, useState } from "react";
import s from "../styles/Landing.module.css";
import screen from "../assets/screen.svg";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import { AuthContext } from "../context/AuthContext";
import { useNavigate,Navigate } from "react-router-dom";

function Landing() {
  const [state, setState] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const clickHandler = () => {
    setState(!state);
  };

  if (auth.user) {
    navigate("/home");
  }
  return (
    <>
      {auth.user ? (
        <Navigate to="/home" />
      ) : (
        <div className={s.Container}>
          <div className={s.childContainer}>
            <div className={s.auth}>
              {state ? (
                <SignUp onclick={clickHandler} />
              ) : (
                <Login onclick={clickHandler} />
              )}
            </div>
            <div className={s.art}>
              <img src={screen} alt="screen" height="320px" />
              <p className={s.text}>
                Join <span className={s.mil}>Millions</span> of students and
                teachers from all around the world
              </p>
              <p className={s.text}>
                Get started <span className={s.mil}>Now</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Landing;
