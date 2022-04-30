import instance from './api';

const rateApi = {
    getRate({ page = 0, limit = 0, options = '' }) {
        return instance.get(`/db/rate?${options}page=${page}&limit=${limit}`);
    },
};

export default rateApi;