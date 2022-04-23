import instance from './api';

const rateApi = {
    getPoint({ page, limit }) {
        return instance.get(`/db/rate?page=${page}&limit=${limit}`);
    },
};

export default rateApi;