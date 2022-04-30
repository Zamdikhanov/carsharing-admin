import instance from './api';

const rateTypeApi = {
    getRateType({ page = 0, limit = 0, options = '' }) {
        return instance.get(
            `/db/rateType?${options}page=${page}&limit=${limit}`,
        );
    },
};

export default rateTypeApi;