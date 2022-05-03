import { instanceWithToken } from './api';

const orderApi = {
    getOrder({ page = 0, limit = 0, options = '' }) {
        return instanceWithToken.get(`/db/order?${options}page=${page}&limit=${limit}`);
    },
};

export default orderApi;