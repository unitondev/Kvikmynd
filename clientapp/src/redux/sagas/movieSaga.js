import {axiosDefault, axiosWithJwt, axiosWithJwtAndData} from "../../axios";
import {
    enqueueSnackbarError, enqueueSnackbarSuccess,
    movieCommentsRequestSuccess,
    movieListRequestSuccess,
    movieRatingsRequestSuccess, selectedMovieRequestSuccess,
    setUserRatingRequestSuccess,
    userCommentRequestSuccess,
    userRatingRequestSuccess
} from "../actions";
import {call, put} from "redux-saga/effects";

export function* sagaMovieListRequest(data){
    try{
        const response = yield call(
            axiosDefault,
            'https://localhost:5001/api/movies',
            'get'
        )

        if( response.status === 200){
            yield put(movieListRequestSuccess(response.data));
        } else {
            yield put(enqueueSnackbarError(
                {
                    message: 'Movie getting request failed',
                    key: new Date().getTime() + Math.random(),
                })
            );
        }
    } catch (e) {
        yield put(enqueueSnackbarError(
            {
                message: e.response.data.title || e.response.data,
                key: new Date().getTime() + Math.random(),
            })
        );
    }
}

export function* sagaCommentsRequest(data){
    try {
        const response = yield call(
            axiosDefault,
            `https://localhost:5001/api/movie${data.payload}/comments`,
            'get'
        )

        if(response.status === 200)
            yield put(movieCommentsRequestSuccess(response.data));
        else
            yield put(enqueueSnackbarError(
                {
                    message: 'Movie comments getting request failed',
                    key: new Date().getTime() + Math.random(),
                })
            );
    } catch (e) {
        yield put(enqueueSnackbarError(
            {
                message: e.response.data.title || e.response.data,
                key: new Date().getTime() + Math.random(),
            })
        );
    }
}

export function* sagaRatingsRequest(data){
    try {
        const response = yield call(
            axiosDefault,
            `https://localhost:5001/api/movie${data.payload}/ratings`,
            'get'
        )

        if(response.status === 200)
            yield put(movieRatingsRequestSuccess(response.data));
        else
            yield put(enqueueSnackbarError(
                {
                    message: 'Movie ratings getting request failed',
                    key: new Date().getTime() + Math.random(),
                })
            );
    } catch (e) {
        yield put(enqueueSnackbarError(
            {
                message: e.response.data.title || e.response.data,
                key: new Date().getTime() + Math.random(),
            })
        );
    }
}

export function* sagaUserRatingRequest(data){
    try {
        const response = yield call(
            axiosWithJwtAndData,
            `https://localhost:5001/get_rating`,
            'post',
            JSON.stringify(data.payload),
            data.payload.jwtToken,
        )

        if(response.status === 200)
            yield put(userRatingRequestSuccess(response.data));
        else
            yield put(enqueueSnackbarError(
                {
                    message: 'User rating getting request failed',
                    key: new Date().getTime() + Math.random(),
                })
            );
    } catch (e) {
        yield put(enqueueSnackbarError(
            {
                message: e.response.data.title || e.response.data,
                key: new Date().getTime() + Math.random(),
            })
        );
    }
}

export function* sagaSetUserRatingRequest(data){
    try {
        const response = yield call(
            axiosWithJwtAndData,
            `https://localhost:5001/create_rating`,
            'post',
            JSON.stringify(data.payload),
            data.payload.jwtToken,
        )

        if(response.status === 200){
            yield put(setUserRatingRequestSuccess(response.data));
            yield put(enqueueSnackbarSuccess({
                message: 'Rated. Click Update rating button',
                key: new Date().getTime() + Math.random(),
            }));
        }
        else
            yield put(enqueueSnackbarError(
                {
                    message: 'Set user rating getting request failed',
                    key: new Date().getTime() + Math.random(),
                })
            );
    } catch (e) {
        yield put(enqueueSnackbarError(
            {
                message: e.response.data.title || e.response.data,
                key: new Date().getTime() + Math.random(),
            })
        );
    }
}

export function* sagaUserCommentRequest(data){
    try {
        const response = yield call(
            axiosWithJwtAndData,
            `https://localhost:5001/add_comment`,
            'post',
            JSON.stringify(data.payload),
            data.payload.jwtToken,
        )

        if(response.status === 200){
            yield put(userCommentRequestSuccess(response.data));
            yield put(enqueueSnackbarSuccess({
                message: 'Comment added. Click Update comments button',
                key: new Date().getTime() + Math.random(),
            }));
        }
        else
            yield put(enqueueSnackbarError(
                {
                    message: 'Create user comment getting request failed',
                    key: new Date().getTime() + Math.random(),
                })
            );
    } catch (e) {
        yield put(enqueueSnackbarError(
            {
                message: e.response.data.title || e.response.data,
                key: new Date().getTime() + Math.random(),
            })
        );
    }
}

export function* sagaSelectedMovieRequest(data){
    try {
        const response = yield call(
            axiosDefault,
            `https://localhost:5001/api/movie${data.payload}`,
            'get',
        )

        if(response.status === 200)
            yield put(selectedMovieRequestSuccess(response.data));
        else
            yield put(enqueueSnackbarError(
                {
                    message: 'Getting movie request failed',
                    key: new Date().getTime() + Math.random(),
                })
            );
    } catch (e) {
        yield put(enqueueSnackbarError(
            {
                message: e.response.data.title || e.response.data,
                key: new Date().getTime() + Math.random(),
            })
        );
    }
}

export function* sagaDeleteCommentRequest(data){
    try {
        const response = yield call(
            axiosWithJwt,
            `https://localhost:5001/delete_comment${data.payload.id}`,
            'get',
            data.payload.jwtToken
        )

        if(response.status === 200){
            yield put(enqueueSnackbarSuccess({
                message: 'Comment was deleted. Update the page',
                key: new Date().getTime() + Math.random(),
            }));
        }
        else
            yield put(enqueueSnackbarError(
                {
                    message: 'Deleting comment request failed',
                    key: new Date().getTime() + Math.random(),
                })
            );
    } catch (e) {
        yield put(enqueueSnackbarError(
            {
                message: e.response.data.title || e.response.data,
                key: new Date().getTime() + Math.random(),
            })
        );
    }
}
