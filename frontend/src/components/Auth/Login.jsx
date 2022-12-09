import React, { useContext, useState } from "react";
import AuthProvider from "../../context/AuthContext";
import { AuthContext } from "../../context/AuthContext";
import s from "../../styles/SignUp.module.css";
import { motion } from "framer-motion";
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
    <AuthProvider>
      <motion.div
        className={s.container}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={submitHandler}>
          <input type="email" name="email" onChange={changeHandler} required />
          <input
            type="password"
            name="password"
            onChange={changeHandler}
            minLength="6"
            required
          />
          <button type="submit" onSubmit={submitHandler}>
            Log in
          </button>
        </form>
        <div>
          <button
            onClick={(e) => {
              props.onclick();
            }}
          >
            Don't have an account?
          </button>
          <button>Forgot password?</button>
        </div>
      </motion.div>
    </AuthProvider>
  );
}

export default Login;
