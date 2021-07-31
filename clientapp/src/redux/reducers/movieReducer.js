import {handleActions} from "redux-actions";
import {
    cleanMovieStore,
    movieCommentsRequestSuccess,
    movieRatingsRequestSuccess,
    selectedMovieRequestSuccess,
    setUserRatingRequestSuccess,
    userRatingRequestSuccess
} from "../actions";

const initState = {
    movie: {},
    comments: [],
    ratings: [],
    userRating: 0,
}

export const movieReducer = handleActions({
    [selectedMovieRequestSuccess]: (state, action) => (
        {
            ...state,
            movie: action.payload,
        }
    ),
    [movieCommentsRequestSuccess]: (state, action) => (
        {
            ...state,
            comments: action.payload,
        }
    ),
    [movieRatingsRequestSuccess]: (state, action) => (
        {
            ...state,
            ratings: action.payload,
        }
    ),
    [userRatingRequestSuccess]: (state, action) => (
        {
            ...state,
            userRating: action.payload,
        }
    ),
    [setUserRatingRequestSuccess]: (state, action) => (
        {
            ...state,
            userRating: action.payload,
        }
    ),
    [cleanMovieStore]: (state, action) => (
        {
            movie: {},
            comments: [],
            ratings: [],
            userRating: 0,
        }
    ),
}, initState);