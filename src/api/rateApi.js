import instance from './api';

const rateApi = {
        getRate({ page, limit, sortPrice }) {
            return instance.get(`/db/rate?page=${page}&limit=${limit}${sortPrice ? (`&sort[price]=${sortPrice}`) : ''}`);
    },
};

export default rateApi;