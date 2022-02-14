import { handleActions } from 'redux-actions'
import * as movieActions from '../actions'

const defaultState = []

export default handleActions(
  {
    [movieActions.movieListSuccess]: (state, action) => {
      return action.response.data
    },
  },
  defaultState
) 