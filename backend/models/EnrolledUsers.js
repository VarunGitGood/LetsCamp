// we could add all the enrolled users in one filed of Bootcamp model but that would be preferable we can have a lot of users
const mongoose = require("mongoose");

const EnrolledUsersSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("EnrolledUsers", EnrolledUsersSchema);
