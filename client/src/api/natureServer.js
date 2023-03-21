import axios from 'axios';

const BASE_URL = 'https://explorer.natureserve.org/api/data';

class NatureServerApi {
	static async getTaxonData(searchTerm) {
		try {
			const suggestionsResponse = await axios.get(`${BASE_URL}/suggestions/`, {
				params: {
					searchTerm,
					recordType: 'ALL'
				}
			});

			return suggestionsResponse.data;
		} catch (error) {
			console.error(error);
			throw new Error('Failed to get taxon data');
		}
	}

	static async getTaxon(uniqueId) {
		try {
			const taxonResponse = await axios.get(`${BASE_URL}/taxon/${uniqueId}`);

			return taxonResponse.data;
		} catch (error) {
			console.error(error);
			throw new Error('Failed to get taxon data');
		}
	}
}

export default NatureServerApi;
