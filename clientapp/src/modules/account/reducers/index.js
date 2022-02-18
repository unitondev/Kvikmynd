import { combineReducers } from 'redux'

import me from './login'
import isLoginSucceeded from './isLoginSucceeded'
import isLoading from './isUserLoading'
import token from './token'

export default combineReducers({
  me,
  isLoginSucceeded,
  isLoading,
  token,
})