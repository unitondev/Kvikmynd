import {FETCH_USERS_SAGA} from "../types";

export function fetchUsers() {
    return {
        type: FETCH_USERS_SAGA
    }
}