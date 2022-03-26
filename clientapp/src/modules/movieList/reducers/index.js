import { combineReducers } from 'redux'

import list from './movieList'
import searchList from './movieSearchList'
import favoritesMoviesList from './favoritesMoviesList'

export default combineReducers({
  list,
  searchList,
  favoritesMoviesList,
})
