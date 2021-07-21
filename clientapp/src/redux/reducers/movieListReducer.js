import {handleActions} from "redux-actions";
import {movieListRequestSuccess} from "../actions";

const initState = {
    movies: [],
}

export const movieListReducer = handleActions({
    [movieListRequestSuccess]: (state, action) => (
        {
            ...state,
            movies: action.payload,
        }
    ),
}, initState)