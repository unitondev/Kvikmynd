import { combineReducers } from 'redux'

import me from './login'
import isLoginSucceeded from './isLoginSucceeded'
import isLoading from './isUserLoading'

export default combineReducers({
  me,
  isLoginSucceeded,
  isLoading,
})