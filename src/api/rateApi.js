import { instance, instanceWithToken } from './api';

const rateApi = {
    getRate({ page = 0, limit = 0, options = '' }) {
        return instance.get(`/db/rate?${options}page=${page}&limit=${limit}`);
    },
    putRate({ id, data }) {
        return instanceWithToken.put(`/db/rate/${id}`, data);
    },
    postRate({ data }) {
        return instanceWithToken.post(`/db/rate`, data);
    },
    deleteRate({ id }) {
        return instanceWithToken.delete(`/db/rate/${id}`);
    },
};

export default rateApi;