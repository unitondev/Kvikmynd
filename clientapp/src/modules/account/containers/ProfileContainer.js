import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as rawActions from '../actions'
import { getUser } from '../selectors'
import { toBase64 } from '../helpers'
import UserSettings from '../components/UserSettings'

const ProfileContainer = () => {
  const user = useSelector(getUser)
  const dispatch = useDispatch()

  const handleUpdateAccount = async (values) => {
    if (values.avatar !== user.avatar && values.avatar != null) {
      values.avatar = await toBase64(values.avatar)
    }

    dispatch(rawActions.updateUserRequest(values))
  }

  const handleChangePassword = (values) => {
    const data = {
      CurrentPassword: values.currentPassword,
      NewPassword: values.newPassword,
    }

    dispatch(rawActions.changePasswordRequest(data))
  }

  const handleDeleteAccount = () => {
    dispatch(rawActions.deleteUserRequest())
  }

  return (
    <UserSettings
      user={user}
      handleUpdateAccount={handleUpdateAccount}
      handleDeleteAccount={handleDeleteAccount}
      handleChangePassword={handleChangePassword}
    />
  )
}

export default ProfileContainer
