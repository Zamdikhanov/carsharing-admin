import instance from './api';

const cityApi = {
    getCity({ page, limit, options }) {
        return instance.get(`/db/city?${options}page=${page}&limit=${limit}`);
    },
};

export default cityApi;