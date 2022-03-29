import { handleActions, combineActions } from 'redux-actions'
import * as rawActions from '../actions'

const defaultState = {
  items: [],
  totalCount: 0,
  isLoading: false,
}

export default handleActions(
  {
    [rawActions.getBookmarksMoviesSuccess]: (state, action) => {
      return { ...action.response.data, isLoading: false }
    },
    [rawActions.getBookmarksMoviesFailure]: (state, action) => {
      return {...state, isLoading: false }
    },
    [rawActions.getBookmarksMoviesRequest]: (state, action) => {
      return {...state, isLoading: true }
    },
    [combineActions(
      rawActions.resetState,
    )]: (state, action) => {
      return defaultState
    },
  },
  defaultState
)
