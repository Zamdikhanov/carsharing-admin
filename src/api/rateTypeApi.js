import instance from './api';

const rateTypeApi = {
    getRateType({ page, limit, options }) {
        return instance.get(
            `/db/rateType?${options}page=${page}&limit=${limit}`,
        );
    },
};

export default rateTypeApi;