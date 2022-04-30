import instance from './api';

const categoryApi = {
    getCategory({ page = 0, limit = 0, options = '' }) {
        return instance.get(
            `/db/category?${options}page=${page}&limit=${limit}`,
        );
    },
};

export default categoryApi;