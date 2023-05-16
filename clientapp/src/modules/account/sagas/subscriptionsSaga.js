import { all, put, select, take, takeLatest } from 'redux-saga/effects'
import {
  cancelSubscription,
  createSubscription,
  getMySubscriptions
} from '@movie/modules/account/actions'
import * as notificationActions from '@movie/shared/snackBarNotification/actions'

function* onCreateSubscriptionSuccess() {
  const message = 'Subscription was successfully completed'
  yield put(notificationActions.enqueueSnackbarSuccess({ message }))
  yield put(getMySubscriptions.request())
}

function* onCreateSubscriptionFailure() {
  const message = 'Subscription was not completed'
  yield put(notificationActions.enqueueSnackbarError({ message }))
}

function* onCancelSubscriptionSuccess() {
  const message = 'Subscription was successfully canceled'
  yield put(notificationActions.enqueueSnackbarSuccess({ message }))
  yield put(getMySubscriptions.request())
}

function* onCancelSubscriptionFailure() {
  const message = 'Subscription was not canceled'
  yield put(notificationActions.enqueueSnackbarError({ message }))
}

function* subscriptionsSaga() {
  yield all([
    takeLatest(createSubscription.success, onCreateSubscriptionSuccess),
    takeLatest(createSubscription.failure, onCreateSubscriptionFailure),
    takeLatest(cancelSubscription.success, onCancelSubscriptionSuccess),
    takeLatest(cancelSubscription.failure, onCancelSubscriptionFailure),
  ])
}

export default subscriptionsSaga
