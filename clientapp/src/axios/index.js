import axios from "axios";

export function axiosDefault(url, method, data) {
    return axios({
        url,
        method,
        data,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        },
    });
}

export function axiosWithJwt(url, method, data, token) {
    return axios({
        url,
        method,
        data,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
    });
}