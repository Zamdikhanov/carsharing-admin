import instance from './api';

const categoryApi = {
    getCategory({ page, limit, options }) {
        return instance.get(
            `/db/category?${options}page=${page}&limit=${limit}`,
        );
    },
};

export default categoryApi;