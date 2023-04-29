import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import account from '@movie/modules/account/reducers'
import movieList from '@movie/modules/movieList/reducers'
import movie from '@movie/modules/movie/reducers'
import notifications from '@movie/shared/snackBarNotification/reducers'

export const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    account,
    notifications,
    movieList,
    currentMovie: movie,
  })
