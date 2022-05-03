import { instance, instanceWithToken } from './api';

const carApi = {
    getCar({ page = 0, limit = 0, options = '' }) {
        return instance.get(`/db/car?${options}page=${page}&limit=${limit}`);
    },
    putCar({ id, data }) {
        return instanceWithToken.put(`/db/car/${id}`, data);
    },
    postCar({ data }) {
        return instanceWithToken.post(`/db/car`, data);
    },
    deleteCar({ id }) {
        return instanceWithToken.delete(`/db/car/${id}`);
    },
};

export default carApi;