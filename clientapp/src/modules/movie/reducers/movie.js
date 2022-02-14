import { handleActions } from 'redux-actions'
import * as movieActions from '../actions'

const defaultState = {
  movie: {},
  comments: [],
  ratings: [],
  genres: [],
  userRating: 0,
  movieToUpdate: false,
}

export default handleActions(
  {
    [movieActions.selectedMovieSuccess]: (state, action) => {
      return {
        ...state,
        movie: action.response.data.movie,
        genres: action.response.data.genreNames,
      }
    },
    [movieActions.movieCommentsSuccess]: (state, action) => {
      return {
        ...state,
        comments: action.response.data,
      }
    },
    [movieActions.movieRatingsSuccess]: (state, action) => {
      return {
        ...state,
        ratings: action.response.data,
      }
    },
    [movieActions.userRatingSuccess]: (state, action) => {
      return {
        ...state,
        userRating: action.response.data,
      }
    },
    [movieActions.setUserRatingSuccess]: (state, action) => {
      return {
        ...state,
        userRating: action.response.data,
      }
    },
    [movieActions.cleanMovieStore]: (state, action) => {
      return {
        movie: {},
        comments: [],
        ratings: [],
        userRating: 0,
        commentsUpdate: false,
      }
    },
    [movieActions.needToUpdateMovie]: (state) => {
      return {
        ...state,
        movieToUpdate: true,
      }
    },
    [movieActions.noNeedToUpdateMovie]: (state) => {
      return {
        ...state,
        movieToUpdate: false,
      }
    },
  },
  defaultState
)