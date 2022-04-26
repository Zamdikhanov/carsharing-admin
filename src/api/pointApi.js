import instance from './api';

const pointApi = {
    getPoint({ page, limit, options }) {
        return instance.get(`/db/point?${options}page=${page}&limit=${limit}`);
    },
};

export default pointApi;