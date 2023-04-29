import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { CircularProgress } from '@mui/material'

import routes from '@movie/routes'
import { getIsLoginSucceeded } from '@movie/modules/account/selectors'
import { hasPermission } from '@movie/modules/permissions/selectors'

const PrivateRoute = ({ component: Component, permission, ...rest }) => {
  const isAuthorized = useSelector(getIsLoginSucceeded)

  const hasPermissions = useSelector((state) => hasPermission(state, permission))

  const isAuthenticated = isAuthorized && hasPermissions

  const redirectUrl = useMemo(() => (isAuthorized ? routes.root : routes.login), [isAuthorized])

  return isAuthorized === null ? (
    <CircularProgress />
  ) : (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to={redirectUrl} />
      }
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  permission: PropTypes.number,
}

export default PrivateRoute
