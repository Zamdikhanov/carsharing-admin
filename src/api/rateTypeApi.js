import { instance, instanceWithToken } from './api';

const rateTypeApi = {
    getRateType({ page = 0, limit = 0, options = '' }) {
        return instance.get(
            `/db/rateType?${options}page=${page}&limit=${limit}`,
        );
    },
    putRateType({ id, data }) {
        return instanceWithToken.put(`/db/rateType/${id}`, data);
    },
    postRateType({ data }) {
        return instanceWithToken.post(`/db/rateType`, data);
    },
    deleteRateType({ id }) {
        return instanceWithToken.delete(`/db/rateType/${id}`);
    },
};

export default rateTypeApi;