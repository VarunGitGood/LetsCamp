const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const sendTokenResponseWithCookie = require("../utils/sendToken");
const sendEmail = require("../utils/sendMail");
const crypto = require("crypto");

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, password, email, role } = req.body;
  if (!name || !password || !email || !role) {
    return next(new ErrorResponse("Please Enter Valid Details", 400));
  }
  const user = await User.create({
    name,
    password,
    email,
    role,
  });
  req.user = user;
  sendTokenResponseWithCookie(user, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { password, email } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse("Please Enter Valid Email and Password", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("invalid credentials", 401));
  }

  const isCorrect = await user.matchPassword(password);

  if (!isCorrect) {
    return next(new ErrorResponse("invalid credentials", 401));
  }
  req.user = user;
  console.log(req.user);

  sendTokenResponseWithCookie(user, 200, res);
});

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new ErrorResponse("User Not Found!", 401));
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.getall = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    data: users,
  });
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorResponse("User Not Found!", 401));
  }
  const resetToken = user.getResetToken();
  // saving the latest additions
  await user.save({ validateBeforeSave: false });

  let tokenUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;
  const message = `Mail sent , please update password to: \n\n ${tokenUrl}`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Reset Password",
      message,
    });
    res.status(200).json({ success: true, data: "Email Sent Successfully" });
  } catch (err) {
    console.log(err.message);
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse("Email could not be sent", 500));
  }
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorResponse("Invalid Token", 400));
  }
  //chnaging the password and making the token expire
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendTokenResponseWithCookie(user, 200, res);
});

exports.updateUserDetails = asyncHandler(async (req, res, next) => {
  const fields = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.user.id, fields, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: user });
});
// admin crud
exports.addUser = asyncHandler(async (req, res, next) => {
  const { name, password, email, role } = req.body;
  const user = await User.create({
    name,
    password,
    email,
    role,
  });
  res.status(200).json({ success: true, data: user });
});
// id
exports.updateUser = asyncHandler(async (req, res, next) => {
  const fields = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, fields, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: user });
});
// id
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, data: user });
});

// get user by id
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({ success: true, data: user });
});
