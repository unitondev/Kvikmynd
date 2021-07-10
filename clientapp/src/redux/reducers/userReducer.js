import {handleActions} from "redux-actions";
import {fetchUsers} from '../actions/index'

const initState = {
    fetchedUsers: [],
};

export const usersReducer = handleActions(
    {
        [fetchUsers]: (state, action) => ({
            ...state, fetchedUsers: action.payload
        })
}, initState);