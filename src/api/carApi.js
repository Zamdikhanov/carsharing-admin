import instance from './api';

const carApi = {
    getCar({ page = 0, limit = 0, options = '' }) {
        return instance.get(`/db/car?${options}page=${page}&limit=${limit}`);
    },
};

export default carApi;