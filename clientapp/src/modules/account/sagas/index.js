import { all } from 'redux-saga/effects'
import loginSaga from './loginSaga'
import userLoadingSaga from './userLoadingSaga'
import registerSaga from './registerSaga'

function* accountSagas() {
  yield all([userLoadingSaga(), loginSaga(), registerSaga()])
}

export default accountSagas
