import { handleActions, combineActions } from 'redux-actions'
import * as rawActions from '../actions'

const defaultState = {
  items: [],
  totalCount: 0,
  isLoading: false,
}

export default handleActions(
  {
    [rawActions.favoritesMoviesListSuccess]: (state, action) => {
      return { ...action.response.data, isLoading: false }
    },
    [rawActions.favoritesMoviesListFailure]: (state, action) => {
      return {...state, isLoading: false }
    },
    [rawActions.favoritesMoviesListRequest]: (state, action) => {
      return {...state, isLoading: true }
    },
    [combineActions(
      rawActions.resetState,
      rawActions.resetFavoritesMovies,
    )] (state, action) {
      return defaultState
    },
  },
  defaultState
)
