import { createAction } from 'redux-actions'

export const enqueueSnackbarInfo = createAction('ENQUEUE_SNACKBAR_INFO')
export const enqueueSnackbarSuccess = createAction('ENQUEUE_SNACKBAR_SUCCESS')
export const enqueueSnackbarError = createAction('ENQUEUE_SNACKBAR_ERROR')
export const removeSnackbar = createAction('REMOVE_SNACKBAR')