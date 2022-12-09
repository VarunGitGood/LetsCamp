const express = require("express");
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviews");

const Review = require("../models/Reviews");

const router = express.Router({ mergeParams: true });

const { protect, authorization } = require("../middleware/auth");

router
  .route("/")
  .get(getReviews)
  .post(protect, authorization("user", "admin"), addReview);

router
  .route("/:id")
  .put(protect, authorization("user", "admin"), updateReview)
  .delete(protect, authorization("user", "admin"), deleteReview);

module.exports = router;
