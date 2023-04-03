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
async function addByGoogle(username, firstName, lastName, email) {
	const duplicateCheck = await db.query(
		`SELECT username
       FROM users
       WHERE username = $1`,
		[ username ]
	);

	if (duplicateCheck.rows[0]) {
		throw new BadRequestError(`Duplicate username: ${username}`);
	}

	const result = await db.query(
		`INSERT INTO users
       (username,
        first_name,
        last_name,
        email)
       VALUES ($1, $2, $3, $4)
       RETURNING username, first_name AS "firstName", last_name AS "lastName", email`,
		[ username, firstName, lastName, email ]
	);

	const user = result.rows[0];

	return user;
}
module.exports = addByGoogle;
