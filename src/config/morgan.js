const morgan = require('morgan');
const fs     = require('fs');
const path   = require('path');
const rfs    = require('rotating-file-stream');

const LOG_DIRECTORY = path.join(process.cwd(), 'logs');

// RFS options, used only in production mode
const RFS_OPTIONS = {
    interval: '1d',   // Rotate daily
    size    : "10M",  // Rotate every 10 MegaBytes written
    maxFiles: 100,
    compress: "gzip", // Compress rotated files
    path    : LOG_DIRECTORY,
};

/**
 * Returns a logger that can be used as a middleware by Express.
 * @returns {Array<Handler>|Handler}
 * - If the server runs in production mode, then it will return an array of middlewares,
 *   one for all logs and one for errors
 * - Otherwise, it will return a single middleware that will write logs to stdout.
 */
const logger = () => {
	if(process.env.NODE_ENV === 'production') {
        // Ensure log directory exists
		fs.existsSync(LOG_DIRECTORY) || fs.mkdirSync(LOG_DIRECTORY);

        return [
            // Log everything
            morgan('common', { stream: rfs.createStream('all.log', RFS_OPTIONS) }),
            
            // Log only errors
            morgan('common', { 
                skip: (_, res) => res.statusCode < 400,
                stream: rfs.createStream('errors.log', RFS_OPTIONS),
            }),
        ];
	}
    return morgan('dev');
};

module.exports = logger;