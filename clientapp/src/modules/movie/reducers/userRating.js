import { handleActions } from 'redux-actions'
import * as movieActions from '../actions'

const defaultState = 0

export default handleActions(
  {
    [movieActions.userRatingSuccess]: (state, action) => {
      return action.response.data
    },
    [movieActions.setUserRatingSuccess]: (state, action) => {
      return action.response.data
    },
    [movieActions.cleanMovieStore]: (state, action) => {
      return defaultState
    },
  },
  defaultState
)