import { all } from 'redux-saga/effects'
import loginSaga from './loginSaga'
import userLoadingSaga from './userLoadingSaga'

function * accountSagas () {
  yield all([
    userLoadingSaga(),
    loginSaga(),
  ])
}

export default accountSagas