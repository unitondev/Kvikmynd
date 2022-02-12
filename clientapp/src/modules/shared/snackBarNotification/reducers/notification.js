import { handleActions } from 'redux-actions'
import * as notificationActions from '../actions'

const defaultState = {
  notifications: [],
}

export default handleActions(
  {
    [notificationActions.enqueueSnackbarSuccess]: (state, action) => ({
      notifications: [
        ...state.notifications,
        {
          key: action.payload.key,
          message: action.payload.message,
          options: {
            variant: 'success',
          },
        },
      ],
    }),
    [notificationActions.enqueueSnackbarError]: (state, action) => ({
      notifications: [
        ...state.notifications,
        {
          key: action.payload.key,
          message: action.payload.message,
          options: {
            variant: 'error',
          },
        },
      ],
    }),
    [notificationActions.enqueueSnackbarInfo]: (state, action) => ({
      notifications: [
        ...state.notifications,
        {
          key: action.payload.key,
          message: action.payload.message,
          options: {
            variant: 'info',
          },
        },
      ],
    }),
    [notificationActions.removeSnackbar]: (state, action) => ({
      notifications: state.notifications.filter((notification) => notification.key !== action.payload),
    }),
  },
  defaultState
)