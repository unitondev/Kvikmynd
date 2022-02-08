import { handleActions } from 'redux-actions'
import { enqueueSnackbarError, enqueueSnackbarInfo, enqueueSnackbarSuccess, removeSnackbar } from '../actions'

const initState = {
  notifications: [],
}

export const snackbarReducer = handleActions(
  {
    [enqueueSnackbarSuccess]: (state, action) => ({
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
    [enqueueSnackbarError]: (state, action) => ({
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
    [enqueueSnackbarInfo]: (state, action) => ({
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
    [removeSnackbar]: (state, action) => ({
      notifications: state.notifications.filter((notification) => notification.key !== action.payload),
    }),
  },
  initState
)
