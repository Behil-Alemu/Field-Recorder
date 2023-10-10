'use strict';

/** Express app for capstone two. */

const express = require('express');
/**CORS is a security feature,prevents  pages from making requests to servers that are not in the same origin (domain, protocol, and port) as the web page itself.  */
const cors = require('cors');
require('dotenv').config();

const { NotFoundError } = require('./expressError.cjs');
const { authenticateJWT } = require('./middleware/auth.cjs');
const authRoutes = require('./routes/auth.cjs');
const usersRoutes = require('./routes/users.cjs');
const sampleEntryRoutes = require('./routes/sample-entry');
const foldersRoutes = require('./routes/folders.cjs');
const imagesRoutes = require('./routes/imageKit');
/**
 *morgan- log details about incoming HTTP requests, such as the request method, URL, response status, and response time.
 */
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(authenticateJWT);

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/sample-entry', sampleEntryRoutes);
app.use('/folders', foldersRoutes);
app.use('/images', imagesRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function(req, res, next) {
	return next(new NotFoundError());
});
// Define the allowed origins (include your Netlify domain)
const allowedOrigins = ['https://field-recorder.netlify.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

/** Generic error handler; anything unhandled goes here. */
app.use(function(err, req, res, next) {
	if (process.env.NODE_ENV !== 'test') console.error(err.stack);
	const status = err.status || 500;
	const message = err.message;

	return res.status(status).json({
		error: { message, status }
	});
});

module.exports = app;
