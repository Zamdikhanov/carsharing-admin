import instance from './api';

const orderApi = {
    getOrder({ offset, limit, accessToken }) {
        return instance.get(`/db/order?offset=${offset}&limit=${limit}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
    },
};

export default orderApi;