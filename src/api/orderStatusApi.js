import instance from './api';

const orderStatusApi = {
    getOrderStatus({ page = 0, limit = 0, options = '' }) {
        return instance.get(`/db/orderStatus?${options}page=${page}&limit=${limit}`);
    },
};

export default orderStatusApi;