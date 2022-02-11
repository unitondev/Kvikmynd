import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import NavBar from '../components/NavBar'
import { logoutRequest } from '../modules/account/actions'
import { getFullName, getUserAvatar, isLoginSucceeded } from '../modules/account/selectors'

export const NavBarContainer = () => {
  const dispatch = useDispatch()
  const isLogined = useSelector(isLoginSucceeded)
  const fullName = useSelector(getFullName)
  const avatar = useSelector(getUserAvatar)
  const history = useHistory()

  const onClickLogout = () => {
    dispatch(logoutRequest())
    history.push('/')
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
