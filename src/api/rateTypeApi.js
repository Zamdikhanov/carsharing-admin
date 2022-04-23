import instance from './api';

const rateTypeApi = {
    getPoint({ page, limit }) {
        return instance.get(`/db/rateType?page=${page}&limit=${limit}`);
    },
};

export default rateTypeApi;