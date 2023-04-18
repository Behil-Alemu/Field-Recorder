import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * */

class SamplesApi {
	// the token for interactive with the API will be stored here.
	static token;

	static async request(endpoint, data = {}, method = 'get') {
		console.debug('API Call:', endpoint, data, method);

		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${SamplesApi.token}` };
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [ message ];
		}
	}
	/** Get the a list of samples */

	static async getSamples(username, folderName) {
		let res = await this.request(`sample-entry/${username}/${folderName}`);
		console.log(res, '{{{{{{results samplepage}}}}}}');
		return res.samples;
	}

	/** Get the a list of samples */

	static async getSampleById(sample_id) {
		let res = await this.request(`sample-entry/${sample_id}`);
		return res.sample;
	}
	/**Add sample to data */
	static async addSamples(data) {
		let res = await this.request(`sample-entry/add`, data, 'post');
		console.log(res);
		return res.newSample;
	}

	/** Edit sample table*/
	static async editSamples(sample_id, data) {
		let res = await this.request(`sample-entry/${sample_id}`, data, 'patch');
		return res.editedSample;
	}

	/** delete the */
	static async deleteSample(sampe_id) {
		let res = await this.request(`sample-entry/${sampe_id}`, {}, 'delete');
		return res.samples;
	}
}

export default SamplesApi;
