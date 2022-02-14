import { combineReducers } from 'redux'

import account from '@movie/modules/account/reducers'
import movieList from '@movie/modules/movieList/reducers'
import movie from '@movie/modules/movie/reducers'
import notifications from '@movie/shared/snackBarNotification/reducers'

export const rootReducer = combineReducers({
  account,
  notifications,
  movieList,
  currentMovie: movie,
})
