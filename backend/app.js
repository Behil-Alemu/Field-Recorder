'use strict';

/** Express app for capstone two. */

const express = require('express');
/**CORS is a security feature,prevents  pages from making requests to servers that are not in the same origin (domain, protocol, and port) as the web page itself.  */
const cors = require('cors');
require('dotenv').config();

const { NotFoundError } = require('./expressError');
const { authenticateJWT } = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const sampleEntryRoutes = require('./routes/sample-entry');
const foldersRoutes = require('./routes/folders');
const imagesRoutes = require('./routes/imageKit');
/**
 *morgan- log details about incoming HTTP requests, such as the request method, URL, response status, and response time.
 */
const morgan = require('morgan');
// const ImageKit = require('imagekit');

const app = express();
//add to middleware stack
// const imagekit = new ImageKit({
// 	publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
// 	privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
// 	urlEndpoint: 'https://ik.imagekit.io/kwjg3hkrf'
// });

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(authenticateJWT);

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/sample-entry', sampleEntryRoutes);
app.use('/folders', foldersRoutes);
app.use('/images', imagesRoutes);

// app.use(function(req, res, next) {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
// 	next();
// });

// app.get('/imgAuth', function(req, res) {
// 	var result = imagekit.getAuthenticationParameters();
// 	res.send(result);
// });

/** Handle 404 errors -- this matches everything */
app.use(function(req, res, next) {
	return next(new NotFoundError());
});

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
