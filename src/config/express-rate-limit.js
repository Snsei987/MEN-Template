const rateLimit = require('express-rate-limit');
var mongoStore = require('rate-limit-mongo');

const appApiLimiter = rateLimit({
    store   : new mongoStore({ uri: process.env.MONGO_URI }),
    windowMs: 1 * 60 * 1000, // 1 minute
    max     : 200,           // Limit each IP to 200 requests per windowMs
    message : 'Too many requests from this IP, please try again in 1 minute',
});

module.exports = appApiLimiter;