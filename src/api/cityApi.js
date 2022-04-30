import instance from './api';

const cityApi = {
    getCity({ page = 0, limit = 0, options = '' }) {
        return instance.get(`/db/city?${options}page=${page}&limit=${limit}`);
    },
};

export default cityApi;