import { all } from 'redux-saga/effects'
import loginSaga from './loginSaga'
import userLoadingSaga from './userLoadingSaga'
import registerSaga from './registerSaga'
import subscriptionsSaga from './subscriptionsSaga'

function* accountSagas() {
  yield all([userLoadingSaga(), loginSaga(), registerSaga(), subscriptionsSaga()])
}

export default accountSagas
