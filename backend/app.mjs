'use strict';

/** Express app for capstone two. */

import express, { json } from 'express';
/**CORS is a security feature,prevents  pages from making requests to servers that are not in the same origin (domain, protocol, and port) as the web page itself.  */
import cors from 'cors';
// require('dotenv').config();
import dotenv from 'dotenv';
import { NotFoundError } from './expressError.js';
import { authenticateJWT } from './middleware/auth.js';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import sampleEntryRoutes from './routes/sample-entry.js';
import foldersRoutes from './routes/folders.js';
import imagesRoutes from './routes/imageKit.js';
/**
 *morgan- log details about incoming HTTP requests, such as the request method, URL, response status, and response time.
 */
import morgan from 'morgan';

const app = express();


app.use(cors());
app.use(json());
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

/** Generic error handler; anything unhandled goes here. */
app.use(function(err, req, res, next) {
	if (process.env.NODE_ENV !== 'test') console.error(err.stack);
	const status = err.status || 500;
	const message = err.message;

	return res.status(status).json({
		error: { message, status }
	});
});

export default app;
