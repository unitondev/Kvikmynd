import { createAction } from 'redux-actions'

export const movieListRequest = createAction('MOVIE_LIST_REQUEST')
export const movieListSuccess = createAction('MOVIE_LIST_SUCCESS')
export const movieListFailure = createAction('MOVIE_LIST_FAILURE')