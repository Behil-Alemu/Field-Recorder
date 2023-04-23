import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class GoogleUserApi {
	static async request(endpoint, data = {}, method = 'get') {
		

		const url = `${BASE_URL}/${endpoint}`;

		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [ message ];
		}
	}
	/** check in SQL if there is a google user by that email */

	static async getUserByEmail(email) {
		let res = await this.request(`users/google/${email}`);
		return res;
	}
	/** check if that username is already in the database   */

	static async getByUsername(username) {
		let res = await this.request(`users/google/${username}`);
		return res;
	}
	/** add a new user with their google profile  */

	static async addByGoogle(data) {
		let res = await this.request(`users/googleAdd`, data, 'post');
		return res;
	}
}
export default GoogleUserApi;
