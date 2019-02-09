import * as axios from 'axios';

const API_URL = 'https://torre-explorer-api.herokuapp.com';

export const fetchConnections =  async (publicId) => {
    try {
        const response = await axios.get(`${API_URL}/top/${publicId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}