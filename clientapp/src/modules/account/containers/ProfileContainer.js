import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as rawActions from '../actions'
import { getUser } from '../selectors'
import { toBase64 } from '../helpers'
import UserSettings from '../components/UserSettings'

const ProfileContainer = () => {
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const handleUpdateAccount = useCallback(
    async (values) => {
      if (values.avatar !== user.avatar && values.avatar != null) {
        values.avatar = await toBase64(values.avatar)
      }

      dispatch(rawActions.updateUserRequest(values))
    },
    [dispatch, user.avatar]
  )

  const handleChangePassword = useCallback(
    (values) => {
      const data = {
        CurrentPassword: values.currentPassword,
        NewPassword: values.newPassword,
      }

      dispatch(rawActions.changePasswordRequest(data))
    },
    [dispatch]
  )

  const handleClickDeleteAccount = useCallback(() => {
    setOpenDeleteDialog(true)
  }, [])

  const handleDeleteAccountSubmit = useCallback(() => {
    dispatch(rawActions.deleteUserRequest())
  }, [])

  const handleDeleteAccountCancel = useCallback(() => {
    setOpenDeleteDialog(false)
  }, [])

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
