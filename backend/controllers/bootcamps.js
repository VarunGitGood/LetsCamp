const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");
const User = require("../models/User");
const EnrolledUsers = require("../models/EnrolledUsers");

// change bootcamps to courses
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;
  const reqQuery = { ...req.query };
  const removeFields = ["select", "sort", "page", "limit"];
  removeFields.forEach((param) => delete reqQuery[param]);

  let queryString = JSON.stringify(reqQuery);

  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = Bootcamp.find(JSON.parse(queryString));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  //pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments(JSON.parse(queryString));

  query = query.skip(startIndex).limit(limit);
  const bootcamps = await query;

  let pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  const bootcampsWithUser = await Promise.all(
    bootcamps.map(async (bootcamp) => {
      const user = await User.findById(bootcamp.user);
      return { ...bootcamp._doc, userName: user.name };
    })
  );
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcampsWithUser,
  });
});
exports.myBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find({ user: req.user.id });
  res.status(200).json({
    success: true,
    data: bootcamps,
  });
});

exports.getBootcamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No Bootcamp Found with ${req.params.id}`, 400)
    );
  }
  const user = await User.findById(bootcamp.user);
  bootcamp = { ...bootcamp._doc, userName: user.name };
  res.status(200).json({ success: true, data: bootcamp });
});

exports.addBootcamp = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.user = req.user.id;
  // a publisher can only upload upto three bootcamps
  const noOfBootcamps = await Bootcamp.countDocuments({ user: req.user.id });
  if (noOfBootcamps > 3 && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `You can only upload upto three bootcamps else go Pro`,
        400
      )
    );
  }
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this bootcamp`,
        401
      )
    );
  }

  bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: bootcamp });
});

exports.delBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this bootcamp`,
        401
      )
    );
  }
  await bootcamp.remove();
  res.status(200).json({ success: true, data: {} });
});

// @PUT
// upload photo url for bootcamp
// /api/v1/bootcamps/:id/photo
exports.uploadBootcampPhoto = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  const { url } = req.body;
  if (!bootcamp) {
    return next(
      new ErrorResponse(`No Bootcamp Found with ${req.params.id}`, 400)
    );
  }
  // we will upload to cloudinary and save the url to the database
  bootcamp.photo = url;
  await bootcamp.save();
  res.status(200).json({ success: true, data: bootcamp });
});

// @POST
// set bootcamp to liked by user
// /api/v1/bootcamps/:id/like
exports.likeBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  const user = await User.findById(req.user.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`No Bootcamp Found with ${req.params.id}`, 400)
    );
  }
  //check if bootcamp is already liked by user
  user.likes.forEach((bootcamp) => {
    if (bootcamp == req.params.id) {
      return next(new ErrorResponse(`Bootcamp already liked`, 400));
    }
  });
  // if not liked then add to likes array
  user.likes.push(req.params.id);
  await user.save();
  res.status(200).json({ success: true, data: user.likes });
});

// @DELETE
// set bootcamp to unliked by user
// /api/v1/bootcamps/:id/unlike (id of bootcamp)
exports.unlikeBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  const user = await User.findById(req.user.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`No Bootcamp Found with ${req.params.id}`, 400)
    );
  }
  user.likes = user.likes.filter(
    (bootcamp) => bootcamp != req.params.id || null
  );
  await user.save();
  res.status(200).json({ success: true, data: user.likes });
});

// @GET
// get all bootcamps liked by user
// /api/v1/bootcamps/liked
exports.getLikedBootcamps = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const bootcamps = await Bootcamp.find({ _id: user.likes });
  res.status(200).json({ success: true, data: bootcamps });
});

// @GET
// get enrolled in bootcamp
// /api/v1/bootcamps/:id/enroll
exports.enrollInBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`No Bootcamp Found with ${req.params.id}`, 400)
    );
  }
  // check if user is already enrolled in bootcamp
  let enrolledUser = await EnrolledUsers.findOne({
    user: req.user.id,
    bootcamp: req.params.id,
  });
  if (enrolledUser) {
    return next(new ErrorResponse(`User already enrolled in bootcamp`, 400));
  }

  enrolledUser = await EnrolledUsers.create({
    user: req.user.id,
    bootcamp: req.params.id,
  });
  res.status(200).json({ success: true, data: enrolledUser });
});

// @GET
// get all count of enrolled users in bootcamp
// /api/v1/bootcamps/:id/enrolled
exports.getEnrolledUsers = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`No Bootcamp Found with ${req.params.id}`, 400)
    );
  }
  const enrolledUsers = await EnrolledUsers.countDocuments({
    bootcamp: req.params.id,
  });
  res.status(200).json({ success: true, data: enrolledUsers });
});

//@GET
// check if user is enrolled in bootcamp
// /api/v1/bootcamps/:id/isEnrolled
exports.isEnrolled = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`No Bootcamp Found with ${req.params.id}`, 400)
    );
  }
  const enrolledUser = await EnrolledUsers.findOne({
    user: req.user.id,
    bootcamp: req.params.id,
  });
  if (enrolledUser) {
    return res.status(200).json({ success: true, data: true });
  }
  res.status(200).json({ success: true, data: false });
});

// @GET
// get all bootcamps the user has enrolled in
// /api/v1/bootcamps/enrolledbootcamps
exports.getEnrolledBootcamps = asyncHandler(async (req, res, next) => {
  const enrolledBootcamps = await EnrolledUsers.find({ user: req.user.id });
  const bootcampIds = enrolledBootcamps.map((bootcamp) => bootcamp.bootcamp);
  const bootcamps = await Bootcamp.find({ _id: bootcampIds });
  res.status(200).json({ success: true, data: bootcamps });
});
