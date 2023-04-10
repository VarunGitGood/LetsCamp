const { redisInit } = require("../config/redisDB");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("./async");

const cache = asyncHandler(async (req, res, next) => {
  const uid = req.user ? req.user.id : 0;
  const redisClient = await redisInit();
  const key = `{${req.method}}${req.originalUrl}${uid}}`;
  console.log(key);
  const cacheData = {
    fromCache: false,
    data: null,
  };
  const data= await redisClient.get(key);
  if (data !== null) {
    cacheData.fromCache = true;
    cacheData.data = JSON.parse(data);
    res.status(200).json({
      success: true,
      data: cacheData,
    });
  } else {
    // custom new sendResponse function
    res.sendResponse = res.json;
    res.json = (data) => {
      // cache the data
      redisClient.set(key, JSON.stringify(data), "EX", 10, (err, reply) => {
        if (err) {
          console.log(err);
        }
        console.log(reply);
      });
      // send the response with naya response function
      res.sendResponse({
        success: true,
        data: data,
      });
    };
    next();
  }
});

module.exports = cache;
