import { createAction } from 'redux-actions'

export const resetState = createAction('RESET_MOVIE_LIST_STATE')

export const movieListRequest = createAction('MOVIE_LIST_REQUEST')
export const movieListSuccess = createAction('MOVIE_LIST_SUCCESS')
export const movieListFailure = createAction('MOVIE_LIST_FAILURE')

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
