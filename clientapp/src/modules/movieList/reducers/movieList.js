import { handleActions } from 'redux-actions'
import * as movieActions from '../actions'

const defaultState = {
  items: [],
  totalCount: 0,
  isLoading: false,
}

export default handleActions(
  {
    [movieActions.movieList.success]: (state, action) => {
      return { ...action.response.data, isLoading: false }
    },
    [movieActions.movieList.failure]: (state, action) => {
      return { ...state, isLoading: false }
    },
    [movieActions.movieList.request]: (state, action) => {
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
    [movieActions.resetState]: (state, action) => {
      return defaultState
    },
  },
  defaultState
)
