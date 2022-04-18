import { createSelector } from 'reselect'
import jwt_decode from 'jwt-decode'
import _ from 'lodash'

import { getJwt } from '@movie/modules/account/selectors'
import { RolePermissions } from '../../../Enums'

export const hasPermission = createSelector(
  [
    getJwt,
    (_, permission) => permission
  ], (jwtToken, permission) => {
    if (!Boolean(permission)) return true
    if (_.isEmpty(jwtToken)) return false
    const jwtPayload = jwt_decode(jwtToken)
    const userRole = jwtPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

    return userRole === 'SystemAdmin'
      ? true
      : Boolean(Object.entries(RolePermissions).find(([role, permissions]) => role === userRole && permissions.includes(permission)))
  },
)
