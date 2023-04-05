'use strict';

const authenticate = require('./usersHelper/authenticate');
const register = require('./usersHelper/register');
const remove = require('./usersHelper/remove');
const update = require('./usersHelper/update');
const getUserInfo = require('./usersHelper/getUserInfo');


class User {
	/** authenticate user with username, password.*/
	static async authenticate(username, password) {
		const userToken = await authenticate(username, password);
		return userToken;
	}

	/** Register user with data.
   */

	static async register({ username, password, firstName, lastName, email }) {
		const user = await register(username, password, firstName, lastName, email);
		return user;
	}

	/** Given a username, return data about user.*/
	static async get(username) {
		const user = await getUserInfo(username);
		return user;
	}

	/** Update user data with `data`.
   */

	static async update(username, data) {
		const user = await update(username, data);
		return user;
	}

	/** Delete given user from database; returns undefined. */

	static async remove(username) {
		const user = await remove(username);
		
		return console.log('removed user', user.username);
	}
}

module.exports = User;
