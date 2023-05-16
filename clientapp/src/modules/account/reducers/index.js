import { combineReducers } from 'redux'

import me from './login'
import isLoginSucceeded from './isLoginSucceeded'
import isLoading from './isUserLoading'
import token from './token'
import isForgotPasswordSucceeded from './isForgotPasswordSucceeded'
import isResetPasswordSucceeded from './isResetPasswordSucceeded'
import isRegisterSucceeded from './isRegisterSucceeded'
import isConfirmEmailSucceeded from './isConfirmEmailSucceeded'
import subscriptions from './subscriptions'

export default combineReducers({
  me,
  isLoginSucceeded,
  isLoading,
  token,
  isForgotPasswordSucceeded,
  isResetPasswordSucceeded,
  isRegisterSucceeded,
  isConfirmEmailSucceeded,
  subscriptions,
})
