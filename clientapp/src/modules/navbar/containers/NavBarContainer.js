import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'

import { logoutRequest } from '../../account/actions'
import { getUserAvatar, getIsLoginSucceeded } from '../../account/selectors'
import Navbar from '../components/Navbar'
import { ColorModeContext } from '../../../components/App/Theme'

const NavBarContainer = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
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
      theme={theme}
      toggleColorMode={colorMode.toggleColorMode}
    />
  )
}

export default NavBarContainer