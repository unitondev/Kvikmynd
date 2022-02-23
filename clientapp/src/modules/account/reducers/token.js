import { combineActions, handleActions } from 'redux-actions'
import * as accountActions from '../actions'

const defaultState = {}

export default handleActions(
  {
    [accountActions.getTokenSuccess] (state, action) {
      return action.response.data.accessToken
    },
    [combineActions(
      accountActions.logoutSuccess,
      accountActions.updateUserSuccess,
      accountActions.deleteUserSuccess,
      accountActions.changePasswordSuccess,
      )] (state, action) {
      return defaultState
    },
    [accountActions.refreshTokensSuccess] (state, action) {
      return action.response.data.accessToken
    },
    [accountActions.registerSuccess] (state, action) {
      return action.response.data.accessToken
    }
  },
  defaultState
)
