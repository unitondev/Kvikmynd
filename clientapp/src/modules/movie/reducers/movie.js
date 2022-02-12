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
    [movieActions.selectedMovieSuccess]: (state, action) => ({
      ...state,
      movie: action.payload.movie,
      genres: action.payload.genreNames,
    }),
    [movieActions.movieCommentsSuccess]: (state, action) => ({
      ...state,
      comments: action.payload,
    }),
    [movieActions.movieRatingsSuccess]: (state, action) => ({
      ...state,
      ratings: action.payload,
    }),
    [movieActions.userRatingSuccess]: (state, action) => ({
      ...state,
      userRating: action.payload,
    }),
    [movieActions.setUserRatingSuccess]: (state, action) => ({
      ...state,
      userRating: action.payload,
    }),
    [movieActions.cleanMovieStore]: (state, action) => ({
      movie: {},
      comments: [],
      ratings: [],
      userRating: 0,
      commentsUpdate: false,
    }),
    [movieActions.needToUpdateMovie]: (state) => ({
      ...state,
      movieToUpdate: true,
    }),
    [movieActions.noNeedToUpdateMovie]: (state) => ({
      ...state,
      movieToUpdate: false,
    }),
  },
  defaultState
)