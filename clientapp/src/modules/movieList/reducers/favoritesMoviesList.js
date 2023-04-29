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
    [rawActions.getMyMoviesRatingsListSuccess]: (state, action) => {
      return { ...action.response.data, isLoading: false }
    },
    [rawActions.getMyMoviesRatingsListFailure]: (state, action) => {
      return { ...state, isLoading: false }
    },
    [rawActions.getMyMoviesRatingsListRequest]: (state, action) => {
      return { ...state, isLoading: true }
    },
    [movieActions.addMovieToBookmarkSuccess]: (state, action) => {
      const { MovieId } = action.payload

      return {
        ...state,
        items: state.items.map((i) => {
          if (i.id === MovieId) i.isBookmark = true
          return i
        }),
      }
    },
    [movieActions.deleteMovieBookmarkSuccess]: (state, action) => {
      const { MovieId } = action.payload

      return {
        ...state,
        items: state.items.map((i) => {
          if (i.id === MovieId) i.isBookmark = false
          return i
        }),
      }
    },
    [combineActions(rawActions.resetState, rawActions.resetMoviesRatingsList)](state, action) {
      return defaultState
    },
  },
  defaultState
)
