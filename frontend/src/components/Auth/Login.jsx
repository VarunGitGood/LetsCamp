import React, { useContext, useState } from "react";
import AuthProvider from "../../context/AuthContext";
import { AuthContext } from "../../context/AuthContext";
import s from "../../styles/SignUp.module.css";
import { motion } from "framer-motion";
import { Button, TextField } from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";



const ObuttonSX = {
  borderColor: "#6741C7",
  color: "#6741C7",
  width: "48%",
  fontSize: "12px",
  // margin: "1rem",
  fontFamily: "Poppins",
  fontWeight: "bold",
  marginTop: "1rem",
  "&:hover": {
    bgcolor: "#6741C7",
    color: "white",
  },
};

const buttonStyle = {
  width: "100%",
  fontSize: "1rem",
  fontWeight: "bold",
  fontFamily: "Poppins",
  marginBottom: "0.5rem",
  backgroundColor: "#6741C7",

  color: "white",
  "&:hover": {
    backgroundColor: "#6741C7",
  },
};

const TextFieldStyle = {
  width: "100%",
  marginBottom: "0.5rem",
  backgroundColor: "white",
};

function Login(props) {
  const auth = useContext(AuthContext);

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    auth.login(state);
  };
  const changeHandler = (e) => {
    const value = e.target.value;
    setState({ ...state, [e.target.name]: value });
  };
  return (
    <>
      <AuthProvider>
        <div className={s.layout}>
          <div className={s.header}>
            <LocalLibraryIcon sx={{ fontSize: "3.2rem" }}></LocalLibraryIcon>
            <h1 className={s.heading}>LetsCamp</h1>
          </div>
          <motion.div
            className={s.container}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={submitHandler} className={s.form}>
              <TextField
                label="Email"
                name="email"
                type="email"
                onChange={changeHandler}
                required
                sx={TextFieldStyle}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                onChange={changeHandler}
                required
                sx={TextFieldStyle}

              />
              <Button
                type="submit"
                onSubmit={submitHandler}
                sx={buttonStyle}
                variant="contained"
              >
                Log in
              </Button>
            </form>
            <div className={s.control}>
              <Button
                onClick={(e) => {
                  props.onclick();
                }}
                sx={ObuttonSX}
                variant="outlined"
              >
                Don't have an account?
              </Button>
              <Button sx={ObuttonSX} variant="outlined">
                Forgot password?
              </Button>
            </div>
          </motion.div>
        </div>
      </AuthProvider>
    </>
  );
}

export default Login;
