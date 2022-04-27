import * as axios from 'axios';
import { APPLICATION_ID, SECRET, BASE_URL } from './config';

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

const BASIC_TOKEN = b64EncodeUnicode(`a1y2r3a4t5:${SECRET}`);

const instance = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
        'X-Api-Factory-Application-Id': `${APPLICATION_ID}`,
        Authorization: `Basic ${BASIC_TOKEN}`,
    },
});

export default instance;