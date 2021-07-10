import axios from "axios";

export function axiosDefault(url, method, data) {
    return axios({
        url,
        method,
        data
    });
}