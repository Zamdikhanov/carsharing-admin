import instance from "./api";

const authAPI = {
    login(authData) {
        return instance.post(`/auth/login`, authData)
    },
    registration(authData) {
        return instance.post(`/auth/register`, authData)
    },
    logout(accessToken) {
        return instance.post(`/auth/logout`, '', {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
    },
};

export default authAPI;