import { all } from 'redux-saga/effects'
import needToUpdateSaga from './needToUpdateSaga'

function * movieSagas () {
  yield all([
    needToUpdateSaga(),
  ])
}

export default movieSagas