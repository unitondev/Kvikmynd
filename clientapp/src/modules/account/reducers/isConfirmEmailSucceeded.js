import { handleActions } from 'redux-actions'
import * as accountActions from '../actions'

const defaultState = false

export default handleActions(
  {
    [accountActions.confirmEmailSuccess](state, action) {
      return true
    },
    [accountActions.resetConfirmEmail](state, action) {
      return defaultState
    },
  },
  defaultState
)
