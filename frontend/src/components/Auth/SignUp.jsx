import React from "react";
import s from "../../styles/SignUp.module.css";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Button, TextField } from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

const TextFieldStyle = {
  width: "100%",
  marginBottom: "0.5rem",
  backgroundColor: "white",
};

const ObuttonSX = {
  borderColor: "#6741C7",
  color: "#6741C7",
  width: "100%",
  fontSize: "1rem",
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

function SignUp(props) {
  const auth = useContext(AuthContext);
  const [state, setState] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      auth.signup(state);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const changeHandler = (e) => {
    const value = e.target.value;
    setState({ ...state, [e.target.name]: value });
  };

  return (
    <div className={s.layout}>
      <div className={s.headerS}>
        <LocalLibraryIcon sx={{ fontSize: "3.2rem" }}></LocalLibraryIcon>
        <h1 className={s.heading}>LetsCamp</h1>
      </div>
      <motion.div
        className={s.containerS}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={submitHandler} className={s.formS}>
          <TextField
            label="Username"
            name="name"
            type="text"
            onChange={changeHandler}
            required
            sx={TextFieldStyle}
          />
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <FormLabel id="radio"> Select Role -></FormLabel>
            <RadioGroup row id="radio">
              <FormControlLabel
                value="user"
                control={<Radio />}
                label="Student"
              />
              <FormControlLabel
                value="publisher"
                control={<Radio />}
                label="Publisher"
              />
            </RadioGroup>
          </div>
          <Button
            variant="contained"
            sx={buttonStyle}
            type="submit"
            value="Submit"
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            sx={ObuttonSX}
            onClick={() => {
              props.onclick();
            }}
          >
            Already Have an Account?
          </Button>
        </form>
      </motion.div>
      ;
    </div>
  );
}

export default SignUp;
