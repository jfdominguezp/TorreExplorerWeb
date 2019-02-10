import * as axios from 'axios';

const API_URL = 'https://torre-explorer-api.herokuapp.com';

export const fetchConnections =  async (publicId, limit = 20) => {
    try {
        const response = await axios.get(`${API_URL}/top/${publicId}?limit=${limit}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const fetchConnectionPath = async (publicId1, publicId2) => {
    try {
        const response = await axios.post(`${API_URL}/connections`, { publicId1, publicId2 });
        return response.data.path;
    } catch (error) {
        console.log(error);
    }
}

export const exportToCSV = async (ids, email) => {
    try {
        const response = await axios.post(`${API_URL}/export`, { ids, email });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}