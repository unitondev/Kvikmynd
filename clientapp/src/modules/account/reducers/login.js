import { handleActions } from 'redux-actions'
import * as accountActions from '../actions'

const defaultState = {
  isLoginSucceeded: undefined,
  user: null,
  loading: false,
}

export default handleActions(
  {
    [accountActions.loginSuccess](state, action) {
      return {
        ...state,
        isLoginSucceeded: true,
        user: action.payload,
      }
    },
    [accountActions.logoutSuccess](state, action) {
      return {
        ...state,
        isLoginSucceeded: false,
        user: null,
      }
    },
    [accountActions.refreshTokensSuccess](state, action) {
      return {
        ...state,
        isLoginSucceeded: true,
        user: action.payload,
      }
    },
    [accountActions.refreshTokensFail](state, action) {
      return {
        ...state,
        isLoginSucceeded: false,
      }
    },
    [accountActions.updateUserSuccess](state, action) {
      return {
        ...state,
        isLoginSucceeded: false,
        user: action.payload,
      }
    },
    [accountActions.deleteUserSuccess](state, action) {
      return {
        ...state,
        isLoginSucceeded: false,
        user: null,
      }
    },
    [accountActions.registerSuccess](state, action) {
      return {
        ...state,
        isLoginSucceeded: true,
        user: action.payload,
      }
    },
    [accountActions.startLoadingUser](state, action) {
      return {
        ...state,
        loading: true,
      }
    },
    [accountActions.stopLoadingUser](state, action) {
      return {
        ...state,
        loading: false,
      }
    },
  },
  defaultState
)
