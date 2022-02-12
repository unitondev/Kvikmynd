import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'

import * as rawActions from '../actions'
import { getNotifications } from '../selectors'

let displayed = []

const NotificationContainer = () => {
  const dispatch = useDispatch()
  const storeDisplayed = (id) => {
    displayed = [...displayed, id]
  }

  const removeDisplayed = (id) => {
    displayed = [...displayed.filter((key) => id !== key)]
  }

  const notifications = useSelector(getNotifications)
  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    notifications.forEach(({ key, message, options = {} }) => {
      enqueueSnackbar(message, {
        key,
        ...options,
        onExited: (event, newKey) => {
          dispatch(rawActions.removeSnackbar(newKey))
          removeDisplayed(newKey)
        },
      })

      storeDisplayed(key)
    })
  }, [notifications])

  return null
}

export default NotificationContainer
