import { combineReducers } from 'redux'

import list from './movieList'
import searchList from './movieSearchList'
import favoritesMoviesList from './favoritesMoviesList'
import bookmarkMoviesList from './bookmarkMoviesList'
import archivedMovieList from './archivedMovieList'

export default combineReducers({
  list,
  searchList,
  favoritesMoviesList,
  bookmarkMoviesList,
  archivedMovieList,
})
