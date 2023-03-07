'use strict';

const db = require('../../db');
const { NotFoundError } = require('../../expressError');
/** Delete given user from database; returns undefined. */
async function remove(username) {
	let result = await db.query(
		`DELETE
       FROM users
       WHERE username = $1
       RETURNING username`,
		[ username ]
	);
	const user = result.rows[0];

	if (!user) throw new NotFoundError(`No user: ${username}`);
}

module.exports = remove;
