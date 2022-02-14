import { handleActions } from 'redux-actions'
import * as movieActions from '../actions'

const defaultState = false

export default handleActions(
  {
    [movieActions.needToUpdateMovie]: (state) => {
      return true
    },
    [movieActions.noNeedToUpdateMovie]: (state) => {
      return false
    },
  },
  defaultState
)