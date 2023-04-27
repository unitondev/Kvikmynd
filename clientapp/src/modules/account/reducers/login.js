import { handleActions, combineActions } from 'redux-actions'
import * as accountActions from '../actions'

const defaultState = {}

export default handleActions(
  {
    [accountActions.getMeSuccess](state, action) {
      return action.response.data
    },
    [combineActions(
      accountActions.updateUserSuccess,
      accountActions.deleteUserSuccess,
      accountActions.logoutSuccess,
      accountActions.changePasswordSuccess
    )](state, action) {
      return defaultState
    },
  },
  defaultState
)
