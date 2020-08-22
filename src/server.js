require('module-alias/register');
require('dotenv').config();

const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const helmet     = require('helmet');
const mongoose   = require('mongoose');

const morgan        = require('@config/morgan');
const appApiLimiter = require('@config/express-rate-limit');

const app = express();

// Middlewares
app.use(helmet());
app.use(morgan());
app.use(cors());
app.use(express.json({ limit: '100kb' }));
app.use(bodyParser.urlencoded({ limit: '100kb', extended: true, parameterLimit: 1000000 }));
app.use(express.static('./public'));

// MongoDB
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.error(error.stack)
    }
})();

// Routes
app.use('/', require('@routes'));
app.use('/v1/', appApiLimiter, require('@routes/api/v1'));

// Error handler
app.use((error, _, res, next) => {
    if (res.headersSent) return next(err);
    error.status ? res.status(error.status) : res.status(500);

    res.json({
        message: error.message || error,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack }), // Add stack property in dev mode only
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Starting server in ${process.env.NODE_ENV} mode on http://localhost:${process.env.PORT || 3000}.`);
});
