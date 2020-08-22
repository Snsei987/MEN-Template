/**
 * This file contains some useful middlewares for Express' routes.
 */

/**
 * Check if current environment is 'production'. Useful when you want to have a route only available in this mode.
 * @param {Request} _ - A Request object from Express. Unused.
 * @param {Response} __ - A Response object from Express. Unused.
 * @param {NextFunction} next - A NextFunction from Express.
 * @returns {void} Go to next middleware if TRUE, DO NOT answer the request otherwise
 */
const isProduction = (_, __, next) => process.env.NODE_ENV === 'production' ? next() : null;

/**
 * Check if current environment is 'development'. Useful when you want to have a route only available in this mode.
 * @param {Request} _ - A Request object from Express. Unused.
 * @param {Response} __ - A Response object from Express. Unused.
 * @param {NextFunction} next - A NextFunction from Express.
 * @returns {void} Go to next middleware if TRUE, DO NOT answer the request otherwise
 */
const isDevelopment = (_, __, next) => process.env.NODE_ENV === 'development' ? next() : null;

module.exports = {
    isProduction,
    isDevelopment,
};