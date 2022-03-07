import { handleActions } from 'redux-actions'
import * as movieActions from '../actions'

const defaultState = []

export default handleActions(
  {
    [movieActions.getMovieBySearchSuccess]: (state, action) => {
      return action.response.data
    },
    [movieActions.resetMovieBySearch]: (state, action) => {
      return defaultState
    },
    [movieActions.resetState]: (state, action) => {
      return defaultState
    },
  },
  defaultState
)
