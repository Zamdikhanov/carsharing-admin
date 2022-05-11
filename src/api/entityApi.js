import { setResponseError } from '../store/appSlice';
import { instanceWithToken } from './api';

const entityApi = {
    getEntity({ entity, page = 0, limit = 0, options = '' }) {
        return instanceWithToken
            .get(`/db/${entity}?${options}page=${page}&limit=${limit}`)
            .catch(function (error) {
                setResponseError({
                    status: error?.response?.status || '',
                    message: error?.response?.data || error?.message,
                });
            });
    },
    putEntity({ entity, id, data }) {
        return instanceWithToken.put(`/db/${entity}/${id}`, data);
    },
    postEntity({ entity, data }) {
        return instanceWithToken.post(`/db/${entity}`, data);
    },
    deleteEntity({ entity, id }) {
        return instanceWithToken.delete(`/db/${entity}/${id}`);
    },
};

export default entityApi;
