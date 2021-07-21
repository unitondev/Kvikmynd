import { takeEvery } from "redux-saga/effects";
import {
    deleteCommentRequest,
    deleteUserRequest,
    loginRequest,
    logoutRequest, movieCommentsRequest, movieListRequest, movieRatingsRequest,
    refreshTokensRequest,
    registerRequest, selectedMovieRequest, setUserRatingRequest,
    updateUserRequest, userCommentRequest, userRatingRequest
} from "../actions";
import {sagaLoginRequest, sagaRegisterRequest, sagaLogoutRequest, sagaRefreshTokens} from "./loginAuthSagas";
import {sagaUpdateUserRequest} from "./updateUser";
import {sagaDeleteUserRequest} from "./deleteUser";
import {
    sagaCommentsRequest, sagaDeleteCommentRequest,
    sagaMovieListRequest,
    sagaRatingsRequest, sagaSelectedMovieRequest,
    sagaSetUserRatingRequest,
    sagaUserCommentRequest,
    sagaUserRatingRequest
} from "./movieSaga";

export function* sagaWatcher(){
    yield takeEvery([loginRequest], sagaLoginRequest);
    yield takeEvery([registerRequest], sagaRegisterRequest);
    yield takeEvery([logoutRequest], sagaLogoutRequest);
    yield takeEvery([refreshTokensRequest], sagaRefreshTokens);
    yield takeEvery([updateUserRequest], sagaUpdateUserRequest);
    yield takeEvery([deleteUserRequest], sagaDeleteUserRequest);
    yield takeEvery([movieListRequest], sagaMovieListRequest);
    yield takeEvery([movieCommentsRequest], sagaCommentsRequest);
    yield takeEvery([movieRatingsRequest], sagaRatingsRequest);
    yield takeEvery([userRatingRequest],sagaUserRatingRequest);
    yield takeEvery([setUserRatingRequest], sagaSetUserRatingRequest);
    yield takeEvery([userCommentRequest], sagaUserCommentRequest);
    yield takeEvery([selectedMovieRequest], sagaSelectedMovieRequest);
    yield takeEvery([deleteCommentRequest], sagaDeleteCommentRequest);
}