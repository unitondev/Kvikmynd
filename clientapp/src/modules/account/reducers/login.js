import { handleActions, combineActions } from 'redux-actions'
import * as accountActions from '../actions'

const defaultState = null

export default handleActions(
  {
    [accountActions.getMeSuccess](state, action) {
      return action.response.data
    },
    [combineActions(
      accountActions.updateUserSuccess,
      accountActions.deleteUserSuccess,
      accountActions.logoutSuccess
    )](state, action) {
      return defaultState
    },
    [accountActions.registerSuccess](state, action) {
      return action.response.data
    },
  },
  defaultState
)
