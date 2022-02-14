import { handleActions } from 'redux-actions'
import * as notificationActions from '../actions'

const defaultState = []

export default handleActions(
  {
    [notificationActions.enqueueSnackbarSuccess]: (state, action) => {
      return [
        ...state.notifications,
        {
          key: action.payload.key,
          message: action.payload.message,
          options: {
            variant: 'success',
          },
        },
      ]
    },
    [notificationActions.enqueueSnackbarError]: (state, action) => {
      return [
        ...state.notifications,
        {
          key: action.payload.key,
          message: action.payload.message,
          options: {
            variant: 'error',
          },
        },
      ]
    },
    [notificationActions.enqueueSnackbarInfo]: (state, action) => {
      return [
        ...state.notifications,
        {
          key: action.payload.key,
          message: action.payload.message,
          options: {
            variant: 'info',
          },
        },
      ]
    },
    [notificationActions.removeSnackbar]: (state, action) => {
      return state.notifications.filter((notification) => notification.key !== action.payload)
    },
  },
  defaultState
)