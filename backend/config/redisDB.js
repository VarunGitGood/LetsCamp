const redis = require("redis");
const colors = require("colors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const redisInit = async () => {
  try {
    const redisClient = redis.createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    });
    redisClient.on("error", (err) => {
      console.log(`Error: ${err.message}`.red);
    });
    await redisClient.connect();
    console.log("redis connected".cyan.underline);
    return redisClient;
  } catch (err) {
    console.log(`Error: ${err.message}`.red);
  }
};

module.exports = { redisInit };
