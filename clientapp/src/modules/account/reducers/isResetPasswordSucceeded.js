import { handleActions } from 'redux-actions'
import * as accountActions from '../actions'

const defaultState = false

export default handleActions(
  {
    [accountActions.resetPasswordSuccess](state, action) {
      return true
    },
    [accountActions.resetForgotPassword](state, action) {
      return defaultState
    },
  },
  defaultState
)
