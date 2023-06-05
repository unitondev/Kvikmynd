import { handleActions } from 'redux-actions'
import * as movieActions from '../actions'

const defaultState = []

export default handleActions(
  {
    [movieActions.getSimilarMovies.success]: (state, action) => {
      return action.response.data
    },
    [movieActions.getSimilarMovies.resetState]: () => {
      return defaultState
    },
  },
  defaultState
)
