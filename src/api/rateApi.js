import instance from './api';

const rateApi = {
    getRate({ page, limit, options }) {
        return instance.get(`/db/rate?${options}page=${page}&limit=${limit}`);
    },
};

export default rateApi;