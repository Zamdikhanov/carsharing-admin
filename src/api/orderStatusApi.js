import { instance, instanceWithToken } from './api';

const orderStatusApi = {
    getOrderStatus({ page = 0, limit = 0, options = '' }) {
        return instance.get(`/db/orderStatus?${options}page=${page}&limit=${limit}`);
    },
    putOrderStatus({ id, data }) {
        return instanceWithToken.put(`/db/orderStatus/${id}`, data);
    },
    postOrderStatus({ data }) {
        return instanceWithToken.post(`/db/orderStatus`, data);
    },
    deleteOrderStatus({ id }) {
        return instanceWithToken.delete(`/db/orderStatus/${id}`);
    },
};

export default orderStatusApi;