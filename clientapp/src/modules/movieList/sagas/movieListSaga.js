import { takeLatest, select, put, all } from 'redux-saga/effects'
import * as rawActions from '../actions'
import { getUserId } from '@movie/modules/account/selectors'

function * onGetFavoritesMoviesList (action) {
  const { PageNumber, PageSize, Order } = action.payload
  const UserId = yield select(getUserId)

  yield put(rawActions.getMyMoviesRatingsListRequest({
    PageNumber,
    PageSize,
    UserId,
    Order,
  }))
}

function * movieListSaga() {
  yield all([
    takeLatest(rawActions.onGetMyMoviesRatingsList, onGetFavoritesMoviesList),
  ])
}

export default movieListSaga