import { handleActions } from 'redux-actions'
import * as movieActions from '../actions'

const defaultState = {
  movies: [],
}

export default handleActions(
  {
    [movieActions.movieListSuccess]: (state, action) => ({
      ...state,
      movies: action.payload,
    }),
  },
  defaultState
)