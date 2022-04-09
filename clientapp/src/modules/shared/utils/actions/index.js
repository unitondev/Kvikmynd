import { createAction } from 'redux-actions'

export const createApiActions = (name) => {
  const request = createAction(name + '_REQUEST')
  const success = createAction(name + '_SUCCESS')
  const failure = createAction(name + '_FAILURE')
  const cancel = createAction(name + '_CANCEL')

  return {
    request,
    success,
    failure,
    cancel,
  }
}
