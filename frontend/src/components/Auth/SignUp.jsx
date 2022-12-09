import React from "react";
import s from "../../styles/SignUp.module.css";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
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
    <motion.div
      className={s.container}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={(e) => {
          props.onclick();
        }}
      >
        Already have an account?
      </button>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter Username"
          name="name"
          onChange={changeHandler}
        />
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          onChange={changeHandler}
        />
        <label>Role: Student</label>
        <input type="radio" name="role" value="user" onChange={changeHandler} />
        <label>Role: Publisher</label>
        <input
          type="radio"
          name="role"
          value="publisher"
          onChange={changeHandler}
        />
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          onChange={changeHandler}
        />
        {/* <input type="password" placeholder="Confirm Password" name="password"/> */}
        <button type="submit">Create An Account</button>
      </form>
    </motion.div>
  );
}

export default SignUp;
