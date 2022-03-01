import { handleActions, combineActions } from 'redux-actions'
import * as accountActions from '../actions'

const defaultState = null

export default handleActions(
  {
    [combineActions(
      accountActions.logoutSuccess,
      accountActions.refreshTokensFailure,
      accountActions.updateUserSuccess,
      accountActions.deleteUserSuccess,
      accountActions.changePasswordSuccess,
    )] (state, action) {
      return false
    },
    [combineActions(
      accountActions.getTokenSuccess,
      accountActions.refreshTokensSuccess,
      accountActions.registerSuccess,
    )] (state, action) {
      return true
    },
  },
  defaultState
)
