import * as axios from 'axios';

const API_URL = 'https://torre-explorer-api.herokuapp.com';

export const fetchConnections =  async (publicId, limit = 20) => {
    const response = await axios.get(`${API_URL}/top/${publicId}?limit=${limit}`);
    return response.data;
}

export const fetchConnectionPath = async (publicId1, publicId2) => {
    const response = await axios.post(`${API_URL}/connections`, { publicId1, publicId2 });
    return response.data.path;
}

export const exportToCSV = async (ids, email) => {
    const response = await axios.post(`${API_URL}/export`, { ids, email });
    return response.data;
}