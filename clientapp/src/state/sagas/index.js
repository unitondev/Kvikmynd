import { all } from 'redux-saga/effects'
import { watchRequest } from './watchRequest'
import appSaga from './appSaga'
import accountSagas from '@movie/modules/account/sagas'
import movieSagas from '@movie/modules/movie/sagas'
import movieListSagas from '@movie/modules/movieList/sagas'

export function * rootSaga () {
  yield all([
    watchRequest(),
    appSaga(),
    accountSagas(),
    movieSagas(),
    movieListSagas(),
  ])
}
