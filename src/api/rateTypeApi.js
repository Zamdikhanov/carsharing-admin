import instance from './api';

const rateTypeApi = {
    getRateType({ page, limit }) {
        return instance.get(`/db/rateType?page=${page}&limit=${limit}`);
    },
};

export default rateTypeApi;