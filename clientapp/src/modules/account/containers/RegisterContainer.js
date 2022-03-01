import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Register from '../components/Register'
import * as rawActions from '../actions'
import { getIsUserLoading, getIsLoginSucceeded } from '../selectors'
import { toBase64 } from '../helpers'
import routes from '@movie/routes'

const RegisterContainer = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const isLogined = useSelector(getIsLoginSucceeded)
  const idLoading = useSelector(getIsUserLoading)

  useEffect(() => {
    if (idLoading === false && isLogined === true) {
      setTimeout(() => history.push(routes.root), 1000)
    }
  }, [idLoading, isLogined])

  const handleRegister = async (values) => {
    if (!!values.avatar) values.avatar = await toBase64(values.avatar)
    dispatch(rawActions.onRegister(values))
  }

  return (
    <Register
      handleRegister={handleRegister}
    />
  )
}

export default RegisterContainer
