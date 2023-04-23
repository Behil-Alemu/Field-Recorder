import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class ImageApi {
	
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
    /** Get auth to send image to imageKit.io  */

	static async getAuth() {
		let res = await this.request(`images/imgAuth`);
		return res;
	}
    /** Get auth to send image to imageKit.io  */

	static async sendImage(data) {
		let res = await this.request(`images/add`,  data, 'post');
		return res;
	}

}
export default ImageApi;