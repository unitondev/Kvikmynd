import { combineReducers } from 'redux'

import movie from './movie'
import movieToUpdate from './movieToUpdate'
import comments from './comments'
import ratings from './ratings'
import userRating from './userRating'
import genres from './genres'

export default combineReducers({
  movie,
  movieToUpdate,
  comments,
  ratings,
  userRating,
  genres,
})