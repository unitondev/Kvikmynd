import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as rawActions from '../actions'
import { getUser } from '../selectors'
import { toBase64 } from '../helpers'
import UserSettings from '../components/UserSettings'

const ProfileContainer = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
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

  const handleClickDeleteAccount = () => {
    setOpenDeleteDialog(true)
  }

  const handleDeleteAccountSubmit = () => {
    dispatch(rawActions.deleteUserRequest())
  }

  const handleDeleteAccountCancel = () => {
    setOpenDeleteDialog(false)
  }

  const dialogProps = {
    onSubmit: handleDeleteAccountSubmit,
    onClose: handleDeleteAccountCancel,
    open: openDeleteDialog,
    title: 'Delete account',
    message: 'Are you sure want to delete your account?',
  }

  return (
    <UserSettings
      user={user}
      handleUpdateAccount={handleUpdateAccount}
      handleChangePassword={handleChangePassword}
      handleClickDeleteAccount={handleClickDeleteAccount}
      dialogProps={dialogProps}
    />
  )
}

export default ProfileContainer
