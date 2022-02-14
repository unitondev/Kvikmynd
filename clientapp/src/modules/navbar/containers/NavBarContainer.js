import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import NavBar from '../components/NavBar'
import { logoutRequest } from '../../account/actions'
import { getFullName, getUserAvatar, getIsLoginSucceeded } from '../../account/selectors'
import routes from '@movie/routes'

const NavBarContainer = () => {
  const dispatch = useDispatch()
  const isLogined = useSelector(getIsLoginSucceeded)
  const fullName = useSelector(getFullName)
  const avatar = useSelector(getUserAvatar)
  const history = useHistory()

  const onClickLogout = () => {
    dispatch(logoutRequest())
    history.push(routes.root)
  }

  return (
    <NavBar
      isLogined={isLogined}
      fullName={fullName}
      avatar={avatar}
      onClickLogout={onClickLogout}
    />
  )
}

export default NavBarContainer