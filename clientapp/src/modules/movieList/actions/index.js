import { createAction } from 'redux-actions'

export const movieListRequest = createAction('MOVIE_LIST_REQUEST')
export const movieListSuccess = createAction('MOVIE_LIST_SUCCESS')
export const movieListFailure = createAction('MOVIE_LIST_FAILURE')

export const getMovieBySearchRequest = createAction('GET_MOVIE_BY_SEARCH_REQUEST')
export const getMovieBySearchSuccess = createAction('GET_MOVIE_BY_SEARCH_SUCCESS')
export const getMovieBySearchFailure = createAction('GET_MOVIE_BY_SEARCH_FAILURE')
export const resetMovieBySearch = createAction('RESET_MOVIE_BY_SEARCH')
