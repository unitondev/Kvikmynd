import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Login from '../components/Login'
import * as rawActions from '../actions'
import { getIsUserLoading, getIsLoginSucceeded } from '../selectors'
import routes from '@movie/routes'

const LoginContainer = () => {
  const dispatch = useDispatch()
  const isLogined = useSelector(getIsLoginSucceeded)
  const idLoading = useSelector(getIsUserLoading)
  const history = useHistory()

  // TODO rewrite it
  useEffect(() => {
    if (idLoading === false && isLogined === true) history.push(routes.root)
  }, [idLoading, isLogined])

  const handleLogin = (values) => {
    dispatch(rawActions.onLogin(values))
  }

  return (
    <Login
      handleLogin={handleLogin}
    />
  )
}

export default LoginContainer
