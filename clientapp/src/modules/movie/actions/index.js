import { createAction } from 'redux-actions'
import { createApiActions } from '@movie/shared/utils/actions'

export const selectedMovieRequest = createAction('SELECTED_MOVIE_REQUEST')
export const selectedMovieSuccess = createAction('SELECTED_MOVIE_SUCCESS')
export const selectedMovieFailure = createAction('SELECTED_MOVIE_FAILURE')

export const movieCommentsRequest = createAction('MOVIE_COMMENTS_REQUEST')
export const movieCommentsSuccess = createAction('MOVIE_COMMENTS_SUCCESS')
export const movieCommentsFailure = createAction('MOVIE_COMMENTS_FAILURE')

export const movieRatingsRequest = createAction('MOVIE_RATINGS_REQUEST')
export const movieRatingsSuccess = createAction('MOVIE_RATINGS_SUCCESS')
export const movieRatingsFailure = createAction('MOVIE_RATINGS_FAILURE')

export const userRatingRequest = createAction('USER_RATING_REQUEST')
export const userRatingSuccess = createAction('USER_RATING_SUCCESS')
export const userRatingFailure = createAction('USER_RATING_FAILURE')

export const cleanMovieStore = createAction('CLEAN_MOVIE_STORE')

export const noNeedToUpdateMovie = createAction('NO_NEED_TO_UPDATE_MOVIE')
export const needToUpdateMovie = createAction('NEED_TO_UPDATE_MOVIE')

export const setUserRatingRequest = createAction('SET_USER_RATING_REQUEST')
export const setUserRatingSuccess = createAction('SET_USER_RATING_SUCCESS')
export const setUserRatingFailure = createAction('SET_USER_RATING_FAILURE')

export const deleteUserRatingRequest = createAction('DELETE_USER_RATING_REQUEST')
export const deleteUserRatingSuccess = createAction('DELETE_USER_RATING_SUCCESS')
export const deleteUserRatingFailure = createAction('DELETE_USER_RATING_FAILURE')

export const userCommentRequest = createAction('USER_COMMENT_REQUEST')
export const userCommentSuccess = createAction('USER_COMMENT_SUCCESS')
export const userCommentFailure = createAction('USER_COMMENT_FAILURE')

export const deleteCommentRequest = createAction('DELETE_COMMENT_REQUEST')
export const deleteCommentSuccess = createAction('DELETE_COMMENT_SUCCESS')
export const deleteCommentFailure = createAction('DELETE_COMMENT_FAILURE')

export const createMovieRequest = createAction('CREATE_MOVIE_REQUEST')
export const createMovieSuccess = createAction('CREATE_MOVIE_SUCCESS')
export const createMovieFailure = createAction('CREATE_MOVIE_FAILURE')

export const deleteMovieRequest = createAction('DELETE_MOVIE_REQUEST')
export const deleteMovieSuccess = createAction('DELETE_MOVIE_SUCCESS')
export const deleteMovieFailure = createAction('DELETE_MOVIE_FAILURE')

export const updateMovieRequest = createAction('UPDATE_MOVIE_REQUEST')
export const updateMovieSuccess = createAction('UPDATE_MOVIE_SUCCESS')
export const updateMovieFailure = createAction('UPDATE_MOVIE_FAILURE')

export const deleteMoviePermanently = createApiActions('DELETE_MOVIE_PERMANENTLY')

export const restoreMovie = createApiActions('RESTORE_MOVIE')
