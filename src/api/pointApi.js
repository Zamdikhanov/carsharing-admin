import instance from './api';

const pointApi = {
    getPoint({ page = 0, limit = 0, options = '' }) {
        return instance.get(`/db/point?${options}page=${page}&limit=${limit}`);
    },
};

export default pointApi;