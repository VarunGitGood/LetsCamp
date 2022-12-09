const { Router } = require("express");
const express = require("express");
const routes = express.Router();
const {
  registerUser,
  login,
  getMe,
  getall,
  forgotPassword,
  resetPassword,
  updateUserDetails,
  addUser,
  updateUser,
  deleteUser,
  getUser
} = require("../controllers/auth");

const { protect, authorization } = require("../middleware/auth");

routes.route("/register").post(registerUser);
routes.route("/login").post(login);
routes.route("/me").get(protect, getMe);

routes.route("/all").get(protect, authorization("admin"), getall);
routes.route("/forgotpassword").post(forgotPassword);
routes.route("/resetpassword/:resettoken").put(resetPassword);
routes.route("/updateUserDetails").put(protect, updateUserDetails);
routes.route("/adduser").post(addUser);
routes.route("/updateuser/:id").put(updateUser);
routes.route("/deleteuser/:id").delete(deleteUser);
routes.route("/users/:id").get(getUser);


module.exports = routes;
