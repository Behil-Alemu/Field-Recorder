import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * */

class FoldersApi {
	// the token for interactive with the API will be stored here.
	static token;

	static async request(endpoint, data = {}, method = 'get') {
		

		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${FoldersApi.token}` };
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [ message ];
		}
	}
	/** Get the a list of Folder */

	static async getFolder(username) {
		let res = await this.request(`folders/${username}`);
		return res.folders;
	}

	/**Add sample to data */
	static async addFolder(data, username) {
		let res = await this.request(`folders/add`, data, 'post');
		return res.newFolder;
	}

	/** Edit sample table*/
	static async editFolder(id, data) {
		let res = await this.request(`folders/${id}`, data, 'patch');
		return res.folders;
	}

	/** delete the */
	static async deleteFolder(id) {
		let res = await this.request(`folders/${id}`, {}, 'delete');
		return res.folders;
	}
}

export default FoldersApi;
