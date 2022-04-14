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

const basicToken = b64EncodeUnicode(
    `a1y2r3a4t5:${process.env.REACT_APP_SECRET}`,
);

const instance = axios.create({
    baseURL: 'https://api-factory.simbirsoft1.com/api/',
    headers: {
        'X-Api-Factory-Application-Id': `${process.env.REACT_APP_ID}`,
        Authorization: `Basic ${basicToken}`,
    },
});

const authAPI = {
    login(authData) {
        return instance
            .post(`/auth/login`, authData)
            .then((response) => response)
            .catch((error) => {
                console.log(error);
            });
    },
    logout(accessToken) {
        return instance
            .post(`/auth/logout`, '', {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((response) => response.data.data)
            .catch((error) => {
                console.log(error);
            });
    },
};

export default authAPI;