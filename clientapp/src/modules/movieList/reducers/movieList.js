import { handleActions } from 'redux-actions'
import * as movieActions from '../actions'

const defaultState = {
  items: [],
  totalCount: 0,
  isLoading: false,
}

export default handleActions(
  {
    [movieActions.movieListSuccess]: (state, action) => {
      return { ...action.response.data, isLoading: false }
    },
    [movieActions.movieListFailure]: (state, action) => {
      return {...state, isLoading: false }
    },
    [movieActions.movieListRequest]: (state, action) => {
      return {...state, isLoading: true }
    },

    [movieActions.resetState]: (state, action) => {
      return defaultState
    },
  },
  defaultState
)
