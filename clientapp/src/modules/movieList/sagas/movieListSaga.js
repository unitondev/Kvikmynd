import { takeLatest, select, put, all } from 'redux-saga/effects'
import * as rawActions from '../actions'
import { getUserId } from '@movie/modules/account/selectors'
import { restoreAllMovies } from '../actions'
import * as notificationActions from '@movie/shared/snackBarNotification/actions'

function* onGetFavoritesMoviesList(action) {
  const { PageNumber, PageSize, Order } = action.payload
  const UserId = yield select(getUserId)

  yield put(
    rawActions.getMyMoviesRatingsListRequest({
      PageNumber,
      PageSize,
      UserId,
      Order,
    })
  )
}

function* getAllMoviesSuccess(action) {
  const movies = action.response.data
  const file = new Blob([JSON.stringify(movies)], { type: 'application/json' })

  let link = document.createElement('a')
  link.download = 'archive.json'
  link.href = URL.createObjectURL(file)
  link.click()
  URL.revokeObjectURL(link.href)
}

function* restoreAllMoviesSuccess(action) {
  const message = 'All movies was successfully restored'
  yield put(notificationActions.enqueueSnackbarSuccess({ message }))
}

function* restoreAllMoviesFailure(action) {
  const message = 'Movies was not successfully restored'
  yield put(notificationActions.enqueueSnackbarError({ message }))
}

function* movieListSaga() {
  yield all([
    takeLatest(rawActions.onGetMyMoviesRatingsList, onGetFavoritesMoviesList),
    takeLatest(rawActions.getAllMoviesForBackup.success, getAllMoviesSuccess),
    takeLatest(restoreAllMovies.success, restoreAllMoviesSuccess),
    takeLatest(restoreAllMovies.failure, restoreAllMoviesFailure),
  ])
}

export default movieListSaga
