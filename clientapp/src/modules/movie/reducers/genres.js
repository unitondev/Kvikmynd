import { handleActions } from 'redux-actions'
import * as movieActions from '../actions'

const defaultState = []

export default handleActions(
  {
    [movieActions.selectedMovieSuccess]: (state, action) => {
      return action.response.data.genreNames
    },
    [movieActions.cleanMovieStore]: (state, action) => {
      return defaultState
    },
  },
  defaultState
)
