import { handleActions, combineActions } from 'redux-actions'
import * as rawActions from '../actions'

const defaultState = {
  items: [],
  totalCount: 0,
  isLoading: false,
}

export default handleActions(
  {
    [rawActions.getMyMoviesRatingsListSuccess]: (state, action) => {
      return { ...action.response.data, isLoading: false }
    },
    [rawActions.getMyMoviesRatingsListFailure]: (state, action) => {
      return {...state, isLoading: false }
    },
    [rawActions.getMyMoviesRatingsListRequest]: (state, action) => {
      return {...state, isLoading: true }
    },
    [combineActions(
      rawActions.resetState,
      rawActions.resetMoviesRatingsList,
    )] (state, action) {
      return defaultState
    },
  },
  defaultState
)
