const rate = require('express-rate-limit');

const rateLimit = rate({
    windowMs: 30 * 60 * 1000, //  30 minutes
    max: 500,
    message: 'You have exceeded the 100 requests in 30 minutes limit!'
});

module.exports = rateLimit;