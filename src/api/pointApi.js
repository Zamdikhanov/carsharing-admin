import instance from './api';

const pointApi = {
    getPoint({ page, limit }) {
        return instance.get(`/db/point?page=${page}&limit=${limit}`);
    },
};

export default pointApi;