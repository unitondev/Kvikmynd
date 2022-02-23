import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { logoutRequest } from '../../account/actions'
import { getUserAvatar, getIsLoginSucceeded } from '../../account/selectors'
import Navbar from '../components/Navbar'

const NavBarContainer = () => {
  const dispatch = useDispatch()
  const isLogined = useSelector(getIsLoginSucceeded)
  const avatar = useSelector(getUserAvatar)

  const onClickLogout = () => {
    dispatch(logoutRequest())
  }

  const [anchorUser, setAnchorUser] = useState(null)
  const handleOpenUserMenu = (event) => {
    setAnchorUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorUser(null)
  }

  return (
    <Navbar 
      isLogined={isLogined}
      avatar={avatar}
      onClickLogout={onClickLogout}
      anchorUser={anchorUser}
      handleOpenUserMenu={handleOpenUserMenu}
      handleCloseUserMenu={handleCloseUserMenu}
    />
  )
}

export default NavBarContainer