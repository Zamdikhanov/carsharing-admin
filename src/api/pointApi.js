import { instance, instanceWithToken } from './api';

const pointApi = {
    getPoint({ page = 0, limit = 0, options = '' }) {
        return instance.get(`/db/point?${options}page=${page}&limit=${limit}`);
    },
    putPoint({ id, data }) {
        return instanceWithToken.put(`/db/point/${id}`, data);
    },
    postPoint({ data }) {
        return instanceWithToken.post(`/db/point`, data);
    },
    deletePoint({ id }) {
        return instanceWithToken.delete(`/db/point/${id}`);
    },
};

export default pointApi;