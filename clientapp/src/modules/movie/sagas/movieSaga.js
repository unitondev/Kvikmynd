import { all, put, select, takeLatest } from 'redux-saga/effects'

import * as movieActions from '../actions'
import * as notificationActions from '../../shared/snackBarNotification/actions'
import { getMovie } from '../selectors'

function * onPostedComment (action) {
  const { movieId } = action.payload
  yield put (movieActions.movieCommentsRequest(movieId))
}

function * onDeletedComment (action) {
  const currentMovie = yield select(getMovie)
  yield put (movieActions.movieCommentsRequest(currentMovie.id))
}

function * onChangedRating (action) {
  const { movieId } = action.payload
  yield put (movieActions.movieRatingsRequest(movieId))
  yield put (movieActions.selectedMovieRequest(movieId))
}

function * userCommentFailure (action) {
  const message = 'Comment was not successfully posted'
  yield put(notificationActions.enqueueSnackbarError({ message }))
}

function * createMovieSuccess (action) {
  const message = 'Movie was successfully created'
  yield put(notificationActions.enqueueSnackbarSuccess({ message }))
}

function * createMovieFailure (action) {
  const message = 'Movie was not successfully created'
  yield put(notificationActions.enqueueSnackbarError({ message }))
}

function * movieSaga() {
  yield all([
    takeLatest(movieActions.userCommentSuccess, onPostedComment),
    takeLatest(movieActions.deleteCommentSuccess, onDeletedComment),
    takeLatest([movieActions.setUserRatingSuccess, movieActions.deleteUserRatingSuccess], onChangedRating),
    takeLatest(movieActions.userCommentFailure, userCommentFailure),
    takeLatest(movieActions.createMovieSuccess, createMovieSuccess),
    takeLatest(movieActions.createMovieFailure, createMovieFailure),
  ])
}

export default movieSaga
