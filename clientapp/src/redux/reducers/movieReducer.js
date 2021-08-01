import {handleActions} from "redux-actions";
import {
    cleanMovieStore,
    movieCommentsRequestSuccess,
    movieRatingsRequestSuccess,
    selectedMovieRequestSuccess,
    setUserRatingRequestSuccess, startLoadingMovie, stopLoadingMovie,
    userRatingRequestSuccess
} from "../actions";

const initState = {
    movie: {},
    comments: [],
    ratings: [],
    genres: [],
    userRating: 0,
    loading: false,
}

export const movieReducer = handleActions({
    [selectedMovieRequestSuccess]: (state, action) => (
        {
            ...state,
            movie: action.payload.movie,
            genres: action.payload.genreNames
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
            loading: false,
        }
    ),
    [stopLoadingMovie]: (state) => (
        {
            ...state,
            loading: false,
        }
    ),
    [startLoadingMovie]: (state) => (
        {
            ...state,
            loading: true
        }
    ),
}, initState);