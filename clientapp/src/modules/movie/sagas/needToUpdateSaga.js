import { all, put, takeLatest } from 'redux-saga/effects'
import * as movieActions from '../actions'

function* needToUpdateMovie(action) {
  yield put(movieActions.needToUpdateMovie())
}

function* needToUpdateSaga() {
  yield all([
    takeLatest(
      [
        // TODO signalr temporarily disabled
        // movieActions.setUserRatingSuccess,
        // movieActions.userCommentSuccess,
        // movieActions.deleteCommentSuccess
      ],
      needToUpdateMovie
    ),
  ])
}

export default needToUpdateSaga
