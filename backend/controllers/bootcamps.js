const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const geocoder = require("../utils/geocoder");
const Bootcamp = require("../models/Bootcamp");
const User = require("../models/User");
const path = require("path");
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
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
    data: bootcamps,
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
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No Bootcamp Found with ${req.params.id}`, 400)
    );
  }

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

// exports.getBootcampWithinDis = asyncHandler(async (req, res, next) => {
//   const { zipcode, distance } = req.params;  

//   const loc = await geocoder.geocode(zipcode);
//   let lng = loc[0].longitude;
//   let lat = loc[0].latitude;
//   //finding radius kms
//   const radius = distance / 6378;

//   const bootcamps = await Bootcamp.find({
//     location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
//   });
//   res
//     .status(200)
//     .json({ success: true, count: bootcamps.length, data: bootcamps });
// });

// @POST
// upload photo url for bootcamp
exports.UploadBootcampPhoto = asyncHandler(async (req, res, next) => {
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

  // remove bootcamp from likes array
  user.likes = user.likes.filter((bootcamp) => bootcamp != req.params.id);
  await user.save();
  res.status(200).json({ success: true, data: user.likes });
});
