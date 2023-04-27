import { handleActions } from 'redux-actions'
import * as notificationActions from '../actions'

const defaultState = []

export default handleActions(
  {
    [notificationActions.enqueueSnackbarSuccess]: (state, { payload }) => {
      return [
        ...state,
        {
          key: payload.key ? payload.key : new Date().getTime() + Math.random(),
          message: payload.message,
          options: {
            variant: 'success',
          },
        },
      ]
    },
    [notificationActions.enqueueSnackbarError]: (state, { payload }) => {
      return [
        ...state,
        {
          key: payload.key ? payload.key : new Date().getTime() + Math.random(),
          message: payload.message,
          options: {
            variant: 'error',
          },
        },
      ]
    },
    [notificationActions.enqueueSnackbarInfo]: (state, { payload }) => {
      return [
        ...state,
        {
          key: payload.key ? payload.key : new Date().getTime() + Math.random(),
          message: payload.message,
          options: {
            variant: 'info',
          },
        },
      ]
    },
    [notificationActions.removeSnackbar]: (state, { payload }) => {
      return state.filter((i) => i.key !== payload)
    },
  },
  defaultState
)
