import {all} from "redux-saga/effects";
import {sagaAllMovies} from "./GenericMovieSaga";
import {sagaAllUsers} from "./GenericUsersSaga";
import {sagaAllUpdates} from "./GenericUpdateSaga";

export function* sagaWatcher(){
    yield all([sagaAllUsers(), sagaAllMovies(), sagaAllUpdates()]);
}