const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config.cjs');

/** return signed JWT from user data. */

function createToken(user) {
	console.log('Token created:'.green);

	let payload = {
		username: user.username
	};

	return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };
