import instance from './api';

const cityApi = {
    getCity({ page, limit }) {
        return instance.get(`/db/city?page=${page}&limit=${limit}`);
    },
};

export default cityApi;