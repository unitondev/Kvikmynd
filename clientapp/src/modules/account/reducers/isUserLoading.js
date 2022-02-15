import { handleActions } from 'redux-actions'
import * as accountActions from '../actions'

const defaultState = false

export default handleActions(
  {
    [accountActions.startLoadingUser](state, action) {
      return true
    },
    [accountActions.stopLoadingUser](state, action) {
      return false
    },
}, defaultState)
