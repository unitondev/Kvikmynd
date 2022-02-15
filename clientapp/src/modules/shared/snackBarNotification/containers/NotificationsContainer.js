import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'

import _ from 'lodash'

import * as rawActions from '../actions'
import { getNotifications } from '../selectors'

let displayed = []

const NotificationContainer = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(getNotifications)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const result = _.differenceBy(notifications, displayed, 'key')

    result.forEach(({ key, message, options = {} }) => {
      enqueueSnackbar(message, {
        key,
        ...options,
        onExited: (event, newKey) => {
          dispatch(rawActions.removeSnackbar(newKey))
          removeDisplayed(newKey)
        }
      })

      storeDisplayed(key)
    })
  }, [notifications])

  const storeDisplayed = (key) => {
    displayed = [...displayed, { key }]
  }

  const removeDisplayed = (key) => {
    displayed = [...displayed.filter((i) => key !== i.key)]
  }

  return null
}

export default NotificationContainer
