import { handleActions } from 'redux-actions'
import * as movieActions from '../actions'

const defaultState = []

export default handleActions(
  {
    [movieActions.movieCommentsSuccess]: (state, action) => {
      return action.response.data
    },
    [movieActions.cleanMovieStore]: (state, action) => {
      return defaultState
    },
  },
  defaultState
)
