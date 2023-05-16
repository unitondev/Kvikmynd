import { handleActions } from 'redux-actions'
import * as accountActions from '../actions'

const defaultState = {
  list: [],
}

export default handleActions(
  {
    [accountActions.getMySubscriptions.success](state, action) {
      return { ...state, list: action.response.data }
    },
  },
  defaultState
)
