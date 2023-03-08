'use strict';

/** Convenience middleware to handle common auth cases in routes. */

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { UnauthorizedError } = require('../expressError');

/** Middleware: Authenticate user.
 *verifies the JWT token by extracting it from the Authorization header and decoding it using the jwt.verify method. If the token is valid, it sets req.user to the decoded payload and calls the next middleware. 
 Middleware to verify JWT token
 */
// function authenticateJWT(req, res, next) {
// 	try {
// 		const authHeader = req.headers.authorization;
// 		if (authHeader) {
// 			const token = authHeader.split(' ')[1];
// 			console.log(token,"(((((((((((((((((((((())))))))))))))))))))))")
// 			const payload = jwt.verify(token, SECRET_KEY);

// 			req.user = payload;
// 			return next();
// 		}
// 	} catch (err) {
// 		return next(err);
// 	}
// 	return next({
// 		status: 401,
// 		message: 'Unauthorized'
// 	});
// }
function authenticateJWT(req, res, next) {
	try {
		const authHeader = req.headers && req.headers.authorization;
		if (authHeader) {
			//removing the Bearer prefix and trimming any whitespace.
			const token = authHeader.replace(/^[Bb]earer /, '').trim();
			res.locals.user = jwt.verify(token, SECRET_KEY);
		}
		return next();
	} catch (err) {
		return next();
	}
}

// Middleware to check if user is logged in
//ensureLoggedIn is a middleware that checks if the req.user property is set, indicating that the user is logged in. If req.user is not set, it returns an error./*
function ensureLoggedIn(req, res, next) {
	try {
		if (!res.locals.user) throw new UnauthorizedError();
		return next();
	} catch (err) {
		return next(err);
	}
}

module.exports = {
	authenticateJWT,
	ensureLoggedIn
};
