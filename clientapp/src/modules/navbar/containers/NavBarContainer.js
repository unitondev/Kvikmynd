import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { logoutRequest } from '../../account/actions'
import { getUserAvatar, getIsLoginSucceeded } from '../../account/selectors'
import routes from '@movie/routes'
import Navbar from '../components/Navbar'

const NavBarContainer = () => {
  const dispatch = useDispatch()
  const isLogined = useSelector(getIsLoginSucceeded)
  const avatar = useSelector(getUserAvatar)
  const history = useHistory()

  const onClickLogout = () => {
    dispatch(logoutRequest())
    history.push(routes.root)
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