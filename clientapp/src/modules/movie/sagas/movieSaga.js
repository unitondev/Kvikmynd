import { all, put, select, takeLatest } from 'redux-saga/effects'

import * as movieActions from '../actions'
import * as notificationActions from '../../shared/snackBarNotification/actions'
import { getMovie } from '../selectors'
import * as movieListActions from '@movie/modules/movieList/actions'

function * onPostedComment (action) {
  const { movieId } = action.payload
  yield put(movieActions.movieCommentsRequest(movieId))
}

function * onDeletedComment (action) {
  const currentMovie = yield select(getMovie)
  yield put (movieActions.movieCommentsRequest(currentMovie.id))
}

function * onChangedRating (action) {
  const { movieId } = action.payload
  yield put(movieActions.movieRatingsRequest(movieId))
  yield put(movieActions.selectedMovieRequest(movieId))
}

function * userCommentFailure (action) {
  const message = 'Comment was not successfully posted'
  yield put(notificationActions.enqueueSnackbarError({ message }))
}

function * createMovieSuccess (action) {
  const message = 'Movie was successfully created'
  yield put(notificationActions.enqueueSnackbarSuccess({ message }))

  const location = yield select(state => state.router.location)
  const pageNumber = location.query.page
  const searchQuery = location.query.query

  yield put(movieListActions.movieListRequest({
    PageNumber: pageNumber ?? 1,
    PageSize: 5,
    ...searchQuery && { SearchQuery: searchQuery },
  }))
}

function * createMovieFailure (action) {
  const message = 'Movie was not successfully created'
  yield put(notificationActions.enqueueSnackbarError({ message }))
}

function * deleteMovieSuccess (action) {
  const message = 'Movie was successfully deleted'
  yield put(notificationActions.enqueueSnackbarSuccess({ message }))

  const location = yield select(state => state.router.location)
  const pageNumber = location.query.page
  const searchQuery = location.query.query

  yield put(movieListActions.movieListRequest({
    PageNumber: pageNumber ?? 1,
    PageSize: 5,
    ...searchQuery && { SearchQuery: searchQuery },
  }))
}

function * deleteMovieFailure (action) {
  const message = 'Movie was not successfully deleted'
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
    takeLatest(movieActions.deleteMovieSuccess, deleteMovieSuccess),
    takeLatest(movieActions.deleteMovieFailure, deleteMovieFailure),
  ])
}

export default movieSaga
