import { handleActions } from 'redux-actions'
import * as accountActions from '../actions'

const defaultState = null

export default handleActions(
  {
    [accountActions.getTokenSuccess] (state, action) {
      return action.response.data.accessToken
    },
    [accountActions.logoutSuccess] (state, action) {
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
