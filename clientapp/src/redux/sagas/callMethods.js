import {call} from "redux-saga/effects";
import {axiosDefault, axiosWithJwt, axiosWithJwtAndData} from "../../axios";

export function* loginRequest(payload){
    return yield call(
        axiosDefault,
        'https://localhost:5001/login',
        'post',
        JSON.stringify(payload)
    );
}

export function* registerRequest(payload){
    return yield call(
        axiosDefault,
        'https://localhost:5001/register',
        'post',
        JSON.stringify(payload)
    );
}

export function* logoutRequest(_, token){
    return yield call(
        axiosWithJwt,
        'https://localhost:5001/logout',
        'get',
        token
    )
}

export function* refreshTokensRequest(){
    return yield call(
        axiosDefault,
        'https://localhost:5001/refresh_token',
        'get'
    )
}

export function* updateUserRequest(payload, token){
    return yield call(
        axiosWithJwtAndData,
        'https://localhost:5001/update_user',
        'post',
        payload,
        token,
    );
}

export function* deleteUserRequest(_, token){
    return yield call(
        axiosWithJwt,
        'https://localhost:5001/delete_user',
        'get',
        token
    )
}


export function* movieListRequestformovie(){
    return yield call(
        axiosDefault,
        'https://localhost:5001/api/movies',
        'get'
    )
}

export function* movieCommentsRequestformovie(payload){
    return yield call(
        axiosDefault,
        `https://localhost:5001/api/movie${payload}/comments`,
        'get'
    )
}

export function* movieRatingsRequestformovie(payload){
    return yield call(
        axiosDefault,
        `https://localhost:5001/api/movie${payload}/ratings`,
        'get'
    )
}

export function* userRatingRequestformovie(payload, token){
    return yield call(
        axiosWithJwtAndData,
        `https://localhost:5001/get_rating`,
        'post',
        JSON.stringify(payload),
        token,
    )
}

export function* selectedMovieRequestformovie(payload){
    return yield call(
        axiosDefault,
        `https://localhost:5001/api/movie${payload}/withGenres`,
        'get',
    )
}

export function* userCommentRequestforupdate(payload, token){
    return yield call(
        axiosWithJwtAndData,
        `https://localhost:5001/add_comment`,
        'post',
        JSON.stringify(payload),
        token,
    )
}

export function* deleteCommentRequestforupdate(payload, token){
    return yield call(
        axiosWithJwt,
        `https://localhost:5001/delete_comment${payload.id}`,
        'get',
        token
    )
}

export function* setUserRatingRequestforupdate(payload, token){
    return yield call(
        axiosWithJwtAndData,
        `https://localhost:5001/create_rating`,
        'post',
        JSON.stringify(payload),
        token,
    )
}