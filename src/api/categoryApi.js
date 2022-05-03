import { instance, instanceWithToken } from './api';

const categoryApi = {
    getCategory({ page = 0, limit = 0, options = '' }) {
        return instance.get(
            `/db/category?${options}page=${page}&limit=${limit}`,
        );
    },
    putCategory({ id, data }) {
        return instanceWithToken.put(`/db/category/${id}`, data);
    },
    postCategory({ data }) {
        return instanceWithToken.post(`/db/category`, data);
    },
    deleteCategory({ id }) {
        return instanceWithToken.delete(`/db/category/${id}`);
    },
};

export default categoryApi;