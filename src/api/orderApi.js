import instance from './api';

const orderApi = {
    getOrder({ page, limit, accessToken }) {
        return instance.get(`/db/order?page=${page}&limit=${limit}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
    },
};

export default orderApi;