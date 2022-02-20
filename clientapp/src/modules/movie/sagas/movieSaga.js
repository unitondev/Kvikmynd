import { all, put, select, takeLatest } from 'redux-saga/effects'

import * as movieActions from '../actions'
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
}

function * movieSaga() {
  yield all([
    takeLatest(movieActions.userCommentSuccess, onPostedComment),
    takeLatest(movieActions.deleteCommentSuccess, onDeletedComment),
    takeLatest(movieActions.setUserRatingSuccess, onChangedRating),
  ])
}

export default movieSaga