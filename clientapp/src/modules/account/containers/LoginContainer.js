import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import LoginWrapper from '../components/LoginWrapper'
import * as rawActions from '../actions'
import { getIsUserLoading, getIsLoginSucceeded } from '../selectors'
import routes from '@movie/routes'

const LoginContainer = () => {
  const dispatch = useDispatch()
  const isLogined = useSelector(getIsLoginSucceeded)
  const isLoading = useSelector(getIsUserLoading)

  const history = useHistory()
  const { pathname } = useLocation()

  // TODO rewrite it
  useEffect(() => {
    if (isLoading === false && isLogined === true) history.push(routes.root)
  }, [isLoading, isLogined])

  const handleLogin = (values) => {
    dispatch(rawActions.onLogin(values))
  }

  const handleForgotPassword = (values) => {
    dispatch(rawActions.onForgotPassword(values))
  }

  return (
    <LoginWrapper
      isForgotPasswordOpen={pathname.startsWith(routes.forgotPassword)}
      handleForgotPassword={handleForgotPassword}
      handleLogin={handleLogin}
    />
  )
}

export default LoginContainer
