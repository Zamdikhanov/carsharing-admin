import instance from './api';

const orderApi = {
    getOrder({ page, limit, options, accessToken }) {
        return instance.get(`/db/order?${options}page=${page}&limit=${limit}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
    },
};

export default orderApi;