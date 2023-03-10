import axios from 'axios';

const BASE_URL = 'https://explorer.natureserve.org/api/data';

class NatureServerApi {
  static async getTaxonData(searchTerm) {
    try {
      const suggestionsResponse = await axios.get(`${BASE_URL}/suggestions/`, {
        params: {
          searchTerm,
          recordType: 'ALL',
        },
      });
      const taxaId = suggestionsResponse.data.results[0].taxonId;
      const taxonResponse = await axios.get(`${BASE_URL}/taxon/${taxaId}`);
      return taxonResponse.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get taxon data');
    }
  }
}

export default NatureServerApi;
