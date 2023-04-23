import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * */

class UserApi {
	// the token for interactive with the API will be stored here.
	static token;

	static async request(endpoint, data = {}, method = 'get') {

		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${UserApi.token}` };
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [ message ];
		}
	}

	// Individual API routes

	/** Get the current user. */

	static async getCurrentUser(username) {
		let res = await this.request(`users/${username}`);
		return res.user;
	}
	/** Get token for login from username, password. */

	static async login(data) {
		let res = await this.request(`auth/token`, data, 'post');
		return res.token;
	}

	/** Signup for site. */

	static async signup(data) {
		let res = await this.request(`auth/register`, data, 'post');
		return res.token;
	}

	/** Edit user profile page. */

	static async editProfile(username, data) {
		let res = await this.request(`users/${username}`, data, 'patch');
		return res.user;
	}
	
}

export default UserApi;
