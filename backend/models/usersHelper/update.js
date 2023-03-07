'use strict';

const db = require('../../db');
const bcrypt = require('bcrypt');
const { NotFoundError } = require('../../expressError');
const { BCRYPT_WORK_FACTOR } = require("../../config");
const { sqlForPartialUpdate } = require('../../helpers/sql');

/** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { firstName, lastName, password, email }
   *
   * Returns { username, firstName, lastName, email }
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password.
   * Callers of this function must be certain they have validated inputs to this
   * or a serious security risks are opened.
   */

async function update(username, data) {
    //hash the password that is entered
	if (data.password) {
		data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
	}

	const { setCols, values } = sqlForPartialUpdate(data, {
		firstName: 'first_name',
		lastName: 'last_name'
	});
	const usernameVarIdx = '$' + (values.length + 1);

	const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email`;
	const result = await db.query(querySql, [ ...values, username ]);
	const user = result.rows[0];

	if (!user) throw new NotFoundError(`No user: ${username}`);

	delete user.password;
	return user;
}

module.exports = update;
