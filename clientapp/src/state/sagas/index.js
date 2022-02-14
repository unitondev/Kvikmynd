import { all } from 'redux-saga/effects'
import { watchRequest } from './watchRequest'
import appSaga from './appSaga'
import accountSagas from '../../modules/account/sagas'
import movieSagas from '../../modules/movie/sagas'
import movieListSagas from '../../modules/movieList/sagas'

export function * rootSaga () {
  yield all([
    watchRequest(),
    appSaga(),
    accountSagas(),
    movieSagas(),
    movieListSagas(),
  ])
}
