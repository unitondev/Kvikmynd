import { handleActions } from 'redux-actions'
import * as movieActions from '../actions'

const defaultState = {
  items: [],
  totalCount: 0,
}

export default handleActions(
  {
    [movieActions.movieListSuccess]: (state, action) => {
      return action.response.data
    },
    [movieActions.resetState]: (state, action) => {
      return defaultState
    },
  },
  defaultState
) 