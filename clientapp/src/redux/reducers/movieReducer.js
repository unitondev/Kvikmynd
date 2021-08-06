import {handleActions} from "redux-actions";
import {
    cleanMovieStore,
    movieCommentsSuccess,
    movieRatingsSuccess, needToUpdateMovie, noNeedToUpdateMovie,
    selectedMovieSuccess,
    setUserRatingSuccess,
    userRatingSuccess
} from "../actions";

const initState = {
    movie: {},
    comments: [],
    ratings: [],
    genres: [],
    userRating: 0,
    movieToUpdate: false,
}

export const movieReducer = handleActions({
    [selectedMovieSuccess]: (state, action) => (
        {
            ...state,
            movie: action.payload.movie,
            genres: action.payload.genreNames
        }
    ),
    [movieCommentsSuccess]: (state, action) => (
        {
            ...state,
            comments: action.payload,
        }
    ),
    [movieRatingsSuccess]: (state, action) => (
        {
            ...state,
            ratings: action.payload,
        }
    ),
    [userRatingSuccess]: (state, action) => (
        {
            ...state,
            userRating: action.payload,
        }
    ),
    [setUserRatingSuccess]: (state, action) => (
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
            commentsUpdate: false,
        }
    ),
    [needToUpdateMovie]: (state) => (
        {
            ...state,
            movieToUpdate: true,
        }
    ),
    [noNeedToUpdateMovie]: (state) => (
        {
            ...state,
            movieToUpdate: false
        }
    ),
}, initState);