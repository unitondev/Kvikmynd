import { all, put, takeLatest } from 'redux-saga/effects'
import * as movieActions from '../actions'

function * needToUpdateMovie(action) {
  yield put(movieActions.needToUpdateMovie())
}

function * needToUpdateSaga() {
  yield all([
    takeLatest(
      [
        movieActions.setUserRatingRequest,
        movieActions.userCommentRequest,
        movieActions.deleteCommentRequest,
      ],
      needToUpdateMovie
    ),
  ])
}

export default needToUpdateSaga
