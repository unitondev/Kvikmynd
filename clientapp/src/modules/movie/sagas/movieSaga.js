import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import * as movieActions from '../actions'
import * as notificationActions from '../../shared/snackBarNotification/actions'
import { getMovie } from '../selectors'
import * as movieListActions from '@movie/modules/movieList/actions'

function* onPostedComment(action) {
  const { movieId } = action.payload
  yield put(movieActions.movieCommentsRequest(movieId))
}

function* onDeletedComment(action) {
  const currentMovie = yield select(getMovie)
  yield put(movieActions.movieCommentsRequest(currentMovie.id))
}

function* onChangedRating(action) {
  const { movieId } = action.payload
  yield put(movieActions.movieRatingsRequest(movieId))
  yield put(movieActions.selectedMovieRequest(movieId))
}

function* userCommentFailure(action) {
  const message = 'Comment was not successfully posted'
  yield put(notificationActions.enqueueSnackbarError({ message }))
}

function* createMovieSuccess(action) {
  const message = 'Movie was successfully created'
  yield put(notificationActions.enqueueSnackbarSuccess({ message }))

  yield call(updateMovieList)
}

function* createMovieFailure(action) {
  const message = 'Movie was not successfully created'
  yield put(notificationActions.enqueueSnackbarError({ message }))
}

function* deleteMovieSuccess(action) {
  const message = 'Movie was successfully deleted'
  yield put(notificationActions.enqueueSnackbarSuccess({ message }))

  yield call(updateMovieList)
}

function* deleteMovieFailure(action) {
  const message = 'Movie was not successfully deleted'
  yield put(notificationActions.enqueueSnackbarError({ message }))
}

function* updateMovieSuccess(action) {
  const message = 'Movie was successfully updated'
  yield put(notificationActions.enqueueSnackbarSuccess({ message }))

  yield call(updateMovieList)
}

function* updateMovieFailure(action) {
  const message = 'Movie was not successfully updated'
  yield put(notificationActions.enqueueSnackbarError({ message }))
}

function* updateMovieList() {
  const location = yield select((state) => state.router.location)
  const pageNumber = location.query.page
  const searchQuery = location.query.query

  yield put(
    movieListActions.movieList.request({
      PageNumber: pageNumber ?? 1,
      PageSize: 5,
      ...(searchQuery && { SearchQuery: searchQuery }),
    })
  )
}

function* deleteMoviePermanentlySuccess() {
  const message = 'Movie was successfully deleted'
  yield put(notificationActions.enqueueSnackbarSuccess({ message }))

  yield call(updateArchivedMovieList)
}

function* deleteMoviePermanentlyFailure() {
  const message = 'Movie was not successfully deleted'
  yield put(notificationActions.enqueueSnackbarError({ message }))
}

function* restoreMovieSuccess() {
  const message = 'Movie was successfully restored'
  yield put(notificationActions.enqueueSnackbarSuccess({ message }))

  yield call(updateArchivedMovieList)
}

function* restoreMovieFailure() {
  const message = 'Movie was not restored'
  yield put(notificationActions.enqueueSnackbarError({ message }))
}

function* updateArchivedMovieList() {
  const location = yield select((state) => state.router.location)
  const pageNumber = location.query.page

  yield put(
    movieListActions.getArchivedMovieBySearch.request({
      PageNumber: pageNumber ?? 1,
      PageSize: 5,
    })
  )
}

function* movieSaga() {
  yield all([
    takeLatest(movieActions.userCommentSuccess, onPostedComment),
    takeLatest(movieActions.deleteCommentSuccess, onDeletedComment),
    takeLatest(
      [movieActions.setUserRatingSuccess, movieActions.deleteUserRatingSuccess],
      onChangedRating
    ),
    takeLatest(movieActions.userCommentFailure, userCommentFailure),
    takeLatest(movieActions.createMovieSuccess, createMovieSuccess),
    takeLatest(movieActions.createMovieFailure, createMovieFailure),
    takeLatest(movieActions.deleteMovieSuccess, deleteMovieSuccess),
    takeLatest(movieActions.deleteMovieFailure, deleteMovieFailure),
    takeLatest(movieActions.updateMovieSuccess, updateMovieSuccess),
    takeLatest(movieActions.updateMovieFailure, updateMovieFailure),
    takeLatest(movieActions.deleteMoviePermanently.success, deleteMoviePermanentlySuccess),
    takeLatest(movieActions.deleteMoviePermanently.failure, deleteMoviePermanentlyFailure),
    takeLatest(movieActions.restoreMovie.success, restoreMovieSuccess),
    takeLatest(movieActions.restoreMovie.failure, restoreMovieFailure),
  ])
}

export default movieSaga
