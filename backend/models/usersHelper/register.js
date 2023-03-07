'use strict';

const db = require('../../db');
const bcrypt = require('bcrypt');
const { BadRequestError } = require('../../expressError');
const { BCRYPT_WORK_FACTOR } = require('../../config');
/** Register user with data.
   *
   * Returns { username, firstName, lastName, email, isAdmin }
   *
   * Throws BadRequestError on duplicates.
   **/
async function register(username, password, firstName, lastName, email) {
	const duplicateCheck = await db.query(
		`SELECT username
       FROM users
       WHERE username = $1`,
		[ username ]
	);

	if (duplicateCheck.rows[0]) {
		throw new BadRequestError(`Duplicate username: ${username}`);
	}

	const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

	const result = await db.query(
		`INSERT INTO users
       (username,
        password,
        first_name,
        last_name,
        email)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING username, first_name AS "firstName", last_name AS "lastName", email`,
		[ username, hashedPassword, firstName, lastName, email ]
	);

	const user = result.rows[0];

	return user;
}
module.exports = register;
