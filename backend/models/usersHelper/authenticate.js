'use strict';

const db = require('../../db');
const bcrypt = require('bcrypt');
const { UnauthorizedError } = require('../../expressError');
/** authenticate user with username, password.
   *
   * Returns { username, first_name, last_name, email }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

async function authenticate(username, password) {
	// try to find the user first
	const result = await db.query(
		`SELECT username,
              password,
              first_name AS "firstName",
              last_name AS "lastName",
              email,
       FROM users
       WHERE username = $1`,
		[ username ]
	);

	const user = result.rows[0];

	if (user) {
		// compare hashed password to a new hash from password
		const isValid = await bcrypt.compare(password, user.password);
		if (isValid === true) {
			delete user.password;
			return user;
		}
	}

	throw new UnauthorizedError('Invalid username/password');
}
module.exports = authenticate;