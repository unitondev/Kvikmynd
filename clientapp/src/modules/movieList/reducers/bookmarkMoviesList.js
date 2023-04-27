import { handleActions, combineActions } from 'redux-actions'
import * as rawActions from '../actions'
import * as movieActions from '@movie/modules/movieList/actions'

const defaultState = {
  items: [],
  totalCount: 0,
  isLoading: false,
}

export default handleActions(
  {
    [rawActions.getBookmarksMoviesSuccess]: (state, action) => {
      return { ...action.response.data, isLoading: false }
    },
    [rawActions.getBookmarksMoviesFailure]: (state, action) => {
      return { ...state, isLoading: false }
    },
    [rawActions.getBookmarksMoviesRequest]: (state, action) => {
      return { ...state, isLoading: true }
    },
    [movieActions.deleteMovieBookmarkSuccess]: (state, action) => {
      const { MovieId } = action.payload

      return { ...state, items: state.items.filter((i) => i.id !== MovieId) }
    },
    [combineActions(rawActions.resetState)]: (state, action) => {
      return defaultState
    },
  },
  defaultState
)
