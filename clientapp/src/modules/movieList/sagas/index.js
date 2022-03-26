import { all } from 'redux-saga/effects'
import movieListSaga from './movieListSaga'

function * movieListSagas () {
  yield all([
    movieListSaga(),
  ])
}

export default movieListSagas