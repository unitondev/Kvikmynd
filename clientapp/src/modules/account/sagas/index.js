import { all } from 'redux-saga/effects'
import userLoadingSaga from './userLoadingSaga'

function * accountSagas () {
  yield all([
    userLoadingSaga(),
  ])
}

export default accountSagas