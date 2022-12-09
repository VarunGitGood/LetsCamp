const cookie = require("cookie-parser");

const sendTokenResponseWithCookie = async (user, statusCode, res)  => {
    const token = user.getJsonWebTokenSigned();
    const options = {
      expires: new Date(Date.now() + 24 * 360 * 1000),
      httpOnly: true,
    };
  
    res.status(statusCode).cookie("cookie", token, options).json({
      success: true,
      token,
    });
  }

module.exports = sendTokenResponseWithCookie;