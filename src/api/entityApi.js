import instance from './api';

const entityApi = {
    getEntity({ entity, page = 0, limit = 0, options = '', accessToken }) {
        return instance.get(`/db/${entity}?${options}page=${page}&limit=${limit}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
    },
};

export default entityApi;