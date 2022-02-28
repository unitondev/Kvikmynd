import { combineReducers } from 'redux'

import list from './movieList'
import searchList from './movieSearchList'

export default combineReducers({
  list,
  searchList,
})
