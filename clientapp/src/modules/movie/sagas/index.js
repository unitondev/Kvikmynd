import { all } from 'redux-saga/effects'
import needToUpdateSaga from './needToUpdateSaga'
import movieSaga from './movieSaga'

function* movieSagas() {
  yield all([needToUpdateSaga(), movieSaga()])
}

export default movieSagas
