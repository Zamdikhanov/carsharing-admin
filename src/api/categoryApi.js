import instance from './api';

const carApi = {
    getCategory({ page, limit }) {
        return instance.get(`/db/category?page=${page}&limit=${limit}`);
    },
};

export default carApi;