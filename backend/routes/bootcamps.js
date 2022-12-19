const { Router } = require("express");
const express = require("express");
const routes = express.Router();
const {
  getBootcamp,
  getBootcamps,
  updateBootcamp,
  delBootcamp,
  addBootcamp,
  uploadBootcampPhoto,
  myBootcamps,
  likeBootcamp,
  unlikeBootcamp,
  getLikedBootcamps,
  enrollInBootcamp,
  getEnrolledUsers,
} = require("../controllers/bootcamps");

const { protect, authorization } = require("../middleware/auth");
const { route } = require("./reviews");
const reviewRouter = require("./reviews");
routes.use("/:bootcampId/reviews", reviewRouter);
routes
  .route("/")
  .get(getBootcamps)
  .post(protect, authorization("admin", "publisher"), addBootcamp);
routes.route("/liked").get(protect, getLikedBootcamps);
routes
  .route("/mybootcamps")
  .get(protect, authorization("admin", "publisher"), myBootcamps);
routes
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorization("admin", "publisher"), updateBootcamp)
  .delete(protect, authorization("admin", "publisher"), delBootcamp);
routes
  .route("/:id/photo")
  .put(protect, authorization("admin", "publisher"), uploadBootcampPhoto);
routes.route("/:id/like").post(protect, likeBootcamp);
routes.route("/:id/unlike").post(protect, unlikeBootcamp);
routes.route("/:id/enroll").get(protect, enrollInBootcamp);
routes.route("/:id/enrolled").get(protect, getEnrolledUsers);

module.exports = routes;
