import { combineReducers } from 'redux'

import { accountReducers } from '../modules/account'
import { snackbarReducer } from './snackbarReducer'
import { movieReducer } from './movieReducer'
import { movieListReducer } from './movieListReducer'

export const rootReducer = combineReducers({
  login: accountReducers,
  snackbar: snackbarReducer,
  movieList: movieListReducer,
  movie: movieReducer,
})
