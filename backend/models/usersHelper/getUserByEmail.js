'use strict';

const db = require('../../db');
const { NotFoundError } = require('../../expressError');
/** Given a username, return data about user.
   *
   * Returns { username, first_name, last_name }

   *
   * Throws NotFoundError if user not found.
   **/

async function getUserByEmail(email) {
	const userRes = await db.query(
		`SELECT username,
              first_name AS "firstName",
              last_name AS "lastName",
              email
       FROM users
       WHERE email = $1`,
		[ email ]
	);

	const user = userRes.rows[0];
	if (!user) return null;
	return user;
}
module.exports = getUserByEmail;
