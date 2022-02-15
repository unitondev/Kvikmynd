import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { CircularProgress } from '@mui/material'

import routes from '@movie/routes'
import { getJwt, getIsLoginSucceeded } from '@movie/modules/account/selectors'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const jwtToken = useSelector(getJwt)
  const isLoginSucceeded = useSelector(getIsLoginSucceeded)

  return isLoginSucceeded === null
    ? <CircularProgress />
    : <Route
      {...rest}
      render={
        (props) => (!!jwtToken
          ? <Component {...props} />
          : <Redirect to={routes.login} />
        )
      }
    />
}

export default PrivateRoute
