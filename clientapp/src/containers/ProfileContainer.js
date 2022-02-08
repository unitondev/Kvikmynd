import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { getUser, getUserAvatar } from '../redux/selectors'
import { deleteUserRequest, updateUserRequest } from '../redux/actions'
import ProfileRouter from '../views/Profile/ProfileRouter'
import { toBase64 } from '../helpers'

export const ProfileContainer = () => {
  const user = useSelector(getUser)
  const currentAvatar = useSelector(getUserAvatar)
  const dispatch = useDispatch()
  const requiredMessage = 'This field is required'
  const handleSelectingFile = (event) => {
    formik.setFieldValue('avatar', event.currentTarget.files[0])
  }

  const formik = useFormik({
    initialValues: {
      email: `${user.email}`,
      userName: `${user.userName}`,
      fullName: `${user.fullName}`,
      oldPassword: '',
      newPassword: '',
      avatar: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email')
        .max(30, 'Must be less than 30 characters')
        .required(requiredMessage),
      oldPassword: Yup.string().max(50, 'Must be less than 50 characters'),
      newPassword: Yup.string().max(50, 'Must be less than 50 characters'),
      userName: Yup.string().max(25, 'Must be less than 25 characters'),
      fullName: Yup.string().max(25, 'Must be less than 25 characters'),
    }),
    onSubmit: async (values) => {
      if (values.avatar != null) values.avatar = await toBase64(values.avatar)
      else values.avatar = currentAvatar
      dispatch(updateUserRequest(values))
    },
  })

  const deleteAccount = () => {
    dispatch(deleteUserRequest())
  }

  return (
    <ProfileRouter
      onSubmitForm={formik.handleSubmit}
      formik={formik}
      user={user}
      toBase64={toBase64}
      currentAvatar={currentAvatar}
      handleSelectingFile={handleSelectingFile}
      deleteAccount={deleteAccount}
    />
  )
}
