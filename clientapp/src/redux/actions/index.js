import {createAction} from "redux-actions";
export const loginRequest = createAction('LOGIN_REQUEST');
export const loginSuccess = createAction('LOGIN_SUCCESS');
export const registerRequest = createAction('REGISTER_REQUEST');
export const registerSuccess = createAction('REGISTER_SUCCESS');
export const logoutRequest = createAction('LOGOUT_REQUEST');
export const logoutSuccess = createAction('LOGOUT_SUCCESS');
export const refreshTokensRequest = createAction('REFRESH_TOKENS_REQUEST');
export const refreshTokensSuccess = createAction('REFRESH_TOKENS_SUCCESS');
export const refreshTokensFail = createAction('REFRESH_TOKENS_FAIL');
export const updateUserRequest = createAction('UPDATE_USER_REQUEST');
export const updateUserSuccess = createAction('UPDATE_USER_SUCCESS');
export const deleteUserRequest = createAction('DELETE_USER_REQUEST');
export const deleteUserSuccess = createAction('DELETE_USER_SUCCESS');
export const enqueueSnackbarInfo = createAction('ENQUEUE_SNACKBAR_INFO');
export const enqueueSnackbarSuccess = createAction('ENQUEUE_SNACKBAR_SUCCESS');
export const enqueueSnackbarError = createAction('ENQUEUE_SNACKBAR_ERROR');
export const removeSnackbar = createAction('REMOVE_SNACKBAR');
export const movieListRequest = createAction('MOVIE_LIST_REQUESTFORMOVIE');
export const movieListSuccess = createAction('MOVIE_LIST_SUCCESS');
export const movieCommentsRequest = createAction('MOVIE_COMMENTS_REQUESTFORMOVIE');
export const movieCommentsSuccess = createAction('MOVIE_COMMENTS_SUCCESS');
export const movieRatingsRequest = createAction('MOVIE_RATINGS_REQUESTFORMOVIE');
export const movieRatingsSuccess = createAction('MOVIE_RATINGS_SUCCESS');
export const userRatingRequest = createAction('USER_RATING_REQUESTFORMOVIE')
export const userRatingSuccess = createAction('USER_RATING_SUCCESS')
export const selectedMovieRequest = createAction('SELECTED_MOVIE_REQUESTFORMOVIE');
export const selectedMovieSuccess = createAction('SELECTED_MOVIE_SUCCESS')
export const setUserRatingRequest = createAction('SET_USER_RATING_REQUESTFORUPDATE')
export const setUserRatingSuccess = createAction('SET_USER_RATING_SUCCESS')
export const userCommentRequest = createAction('USER_COMMENT_REQUESTFORUPDATE')
export const deleteCommentRequest = createAction('DELETE_COMMENT_REQUESTFORUPDATE');
export const needToUpdateMovie = createAction('NEED_TO_UPDATE_COMMENTS');
export const noNeedToUpdateMovie = createAction('NO_NEED_TO_UPDATE_COMMENTS');
export const cleanMovieStore = createAction('CLEAN_MOVIE_STORE');
export const startLoadingUser = createAction('START_LOADING_USER');
export const stopLoadingUser = createAction('STOP_LOADING_USER');