import * as axios from 'axios';

function b64EncodeUnicode(str) {
    return btoa(
        encodeURIComponent(str).replace(
            /%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode(`0x${p1}`);
            },
        ),
    );
}

const basicToken = b64EncodeUnicode('a1y2r3a4t5:4cbcea96de');

const instance = axios.create({
    baseURL: 'https://api-factory.simbirsoft1.com/api/',
    headers: { 'X-Api-Factory-Application-Id': `5e25c641099b810b946c5d5b` },
    Authorization: `Basic ${basicToken}`,
});

const authAPI = {
    login(authData) {
        return instance
            .post(`/auth/login`, authData)
            .then((response) => response.data.data);
    },
};

// eslint-disable-next-line prettier/prettier
export default authAPI;