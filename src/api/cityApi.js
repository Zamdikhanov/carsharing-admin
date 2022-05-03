import { instance, instanceWithToken } from './api';

const cityApi = {
    getCity({ page = 0, limit = 0, options = '' }) {
        return instance.get(`/db/city?${options}page=${page}&limit=${limit}`);
    },
    putCity({ id, data }) {
        return instanceWithToken.put(`/db/city/${id}`, data);
    },
    postCity({ data }) {
        return instanceWithToken.post(`/db/city`, data);
    },
    deleteCity({ id }) {
        return instanceWithToken.delete(`/db/city/${id}`);
    },
};

export default cityApi;