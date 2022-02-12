import { combineReducers } from 'redux'

import account from '../../modules/account/reducers'
import movieList from '../../modules/movieList/reducers'
import movie from '../../modules/movie/reducers'
import notifications from '../../modules/shared/snackBarNotification/reducers'

export const rootReducer = combineReducers({
  account,
  notifications,
  movieList,
  movie,
})
