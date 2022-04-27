import instance from './api';

const carApi = {
    getCar({ page, limit, options }) {
        return instance.get(`/db/car?${options}page=${page}&limit=${limit}`);
    },
};

export default carApi;