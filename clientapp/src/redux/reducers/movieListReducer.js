import { handleActions } from 'redux-actions'
import { movieListSuccess } from '../actions'

const initState = {
  movies: [],
}

export const movieListReducer = handleActions(
  {
    [movieListSuccess]: (state, action) => ({
      ...state,
      movies: action.payload,
    }),
  },
  initState
)
