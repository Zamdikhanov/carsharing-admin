import instance from './api';

const carApi = {
    getCar({ page, limit }) {
        return instance.get(`/db/car?page=${page}&limit=${limit}`);
    },
};

export default carApi;