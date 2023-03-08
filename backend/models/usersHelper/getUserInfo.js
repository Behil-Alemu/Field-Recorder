'use strict';

const db = require('../../db');
const { NotFoundError } = require('../../expressError');
/** Given a username, return data about user.
   *
   * Returns { username, first_name, last_name }

   *
   * Throws NotFoundError if user not found.
   **/

async function getUserInfo(username) {
	const userRes = await db.query(
      `SELECT username,
              first_name AS "firstName",
              last_name AS "lastName",
              email
       FROM users
       WHERE username = $1`,
      [username]
    );
    

	const user = userRes.rows[0];

	if (!user) throw new NotFoundError(`No user: ${username}`);
	return user;
}
module.exports = getUserInfo;