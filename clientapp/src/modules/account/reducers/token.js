import { handleActions } from 'redux-actions'
import * as accountActions from '../actions'

const defaultState = null

export default handleActions(
  {
    [accountActions.getTokenSuccess](state, action) {
      return action.response.data
    },
    [accountActions.logoutSuccess](state, action) {
      return defaultState
    },
  },
  defaultState
)
