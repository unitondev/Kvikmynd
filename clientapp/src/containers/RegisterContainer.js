import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'

import RegisterView from '../views/Register'
import { registerRequest } from '../redux/actions'
import { toBase64 } from '../helpers'
import { getUserLoading, isLoginSucceeded } from '../redux/selectors'

export const RegisterContainer = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const isLogined = useSelector(isLoginSucceeded)
  const idLoading = useSelector(getUserLoading)
  const handleSelectingFile = (event) => {
    formik.setFieldValue('avatar', event.currentTarget.files[0])
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      fullName: '',
      userName: '',
      avatar: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email')
        .max(30, 'Must be less than 30 characters')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Must be more than 6 characters')
        .max(50, 'Must be less than 50 characters')
        .required('Required'),
      fullName: Yup.string().max(25, 'Must be less than 25 characters').required('Required'),
      userName: Yup.string().max(25, 'Must be less than 25 characters').required('Required'),
    }),
    onSubmit: async (values) => {
      if (!!values.avatar) values.avatar = await toBase64(values.avatar)
      dispatch(registerRequest(values))
    },
  })

  useEffect(() => {
    if (idLoading === false && isLogined === true) {
      setTimeout(() => history.push('/'), 1000)
    }
  }, [idLoading, isLogined])

  return (
    <RegisterView
      onSubmitForm={formik.handleSubmit}
      formik={formik}
      handleSelectingFile={handleSelectingFile}
    />
  )
}
