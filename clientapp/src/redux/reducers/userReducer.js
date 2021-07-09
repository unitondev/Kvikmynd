import {FETCH_USERS} from "../types";

const initState = {
    fetchedUsers: [],
};

export const usersReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return { ...state, fetchedUsers: action.payload };
        default:
            return state;
    }
};