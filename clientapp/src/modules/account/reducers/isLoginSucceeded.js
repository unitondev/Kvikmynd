import { handleActions } from 'redux-actions'
import * as accountActions from '../actions'

const defaultState = null

export default handleActions(
  {
    [accountActions.loginSuccess](state, action) {
      return true
    },
    [accountActions.logoutSuccess](state, action) {
      return false
    },
    [accountActions.refreshTokensSuccess](state, action) {
      return true
    },
    [accountActions.refreshTokensFailure](state, action) {
      return false
    },
    [accountActions.updateUserSuccess](state, action) {
      return false
    },
    [accountActions.deleteUserSuccess](state, action) {
      return false
    },
    [accountActions.registerSuccess](state, action) {
      return true
    },
  },
  defaultState
)
