import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'

import { getJwt, isLoginSucceeded } from './redux/selectors'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const jwtToken = useSelector(getJwt)
  const isLogined = useSelector(isLoginSucceeded)
  if (isLogined === undefined) {
    return <CircularProgress />
  } else {
    return (
      <Route
        {...rest}
        render={(props) => (!!jwtToken ? <Component {...props} /> : <Redirect to='/login' />)}
      />
    )
  }
}

export default PrivateRoute
