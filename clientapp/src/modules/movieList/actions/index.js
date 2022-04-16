import { createAction } from 'redux-actions'
import { createApiActions } from '@movie/shared/utils/actions'

export const resetState = createAction('RESET_MOVIE_LIST_STATE')

export const movieList = createApiActions('MOVIE_LIST')

export const getMovieBySearchRequest = createAction('GET_MOVIE_BY_SEARCH_REQUEST')
export const getMovieBySearchSuccess = createAction('GET_MOVIE_BY_SEARCH_SUCCESS')
export const getMovieBySearchFailure = createAction('GET_MOVIE_BY_SEARCH_FAILURE')
export const resetMovieBySearch = createAction('RESET_MOVIE_BY_SEARCH')

export const onGetMyMoviesRatingsList = createAction('ON_GET_MY_MOVIES_RATINGS_LIST')
export const getMyMoviesRatingsListRequest = createAction('GET_MY_MOVIES_RATINGS_LIST_REQUEST')
export const getMyMoviesRatingsListSuccess = createAction('GET_MY_MOVIES_RATINGS_LIST_SUCCESS')
export const getMyMoviesRatingsListFailure = createAction('GET_MY_MOVIES_RATINGS_LIST_FAILURE')
export const resetMoviesRatingsList = createAction('RESET_MOVIES_RATINGS_LIST')

export const addMovieToBookmarkRequest = createAction('ADD_MOVIE_TO_BOOKMARK_REQUEST')
export const addMovieToBookmarkSuccess = createAction('ADD_MOVIE_TO_BOOKMARK_SUCCESS')
export const addMovieToBookmarkFailure = createAction('ADD_MOVIE_TO_BOOKMARK_FAILURE')

export const deleteMovieBookmarkRequest = createAction('DELETE_MOVIE_BOOKMARK_REQUEST')
export const deleteMovieBookmarkSuccess = createAction('DELETE_MOVIE_BOOKMARK_SUCCESS')
export const deleteMovieBookmarkFailure = createAction('DELETE_MOVIE_BOOKMARK_FAILURE')

export const getBookmarksMoviesRequest = createAction('GET_BOOKMARKS_MOVIES_REQUEST')
export const getBookmarksMoviesSuccess = createAction('GET_BOOKMARKS_MOVIES_SUCCESS')
export const getBookmarksMoviesFailure = createAction('GET_BOOKMARKS_MOVIES_FAILURE')

export const getArchivedMovieBySearch = createApiActions('GET_ARCHIVED_MOVIE_BY_SEARCH')

export const getAllMoviesForBackup = createApiActions('GET_ALL_MOVIES_FOR_BACKUP')

export const restoreAllMovies = createApiActions('RESTORE_ALL_MOVIES')