import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Container  } from '@mui/material'

import NavBar from '../components/NavBar'
import { logoutRequest } from '../../account/actions'
import { getFullName, getUserAvatar, getIsLoginSucceeded } from '../../account/selectors'
import routes from '@movie/routes'
import MuiNavbar from '../components/muiNavbar'

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

  const [anchorUser, setAnchorUser] = useState(null)
  const handleOpenUserMenu = (event) => {
    setAnchorUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorUser(null)
  }

  return (
    <>
      <Container maxWidth="lg">
        <NavBar
          isLogined={isLogined}
          fullName={fullName}
          avatar={avatar}
          onClickLogout={onClickLogout}
        />
      </Container>
      <MuiNavbar 
        isLogined={isLogined}
        fullName={fullName}
        avatar={avatar}
        onClickLogout={onClickLogout}
        anchorUser={anchorUser}
        handleOpenUserMenu={handleOpenUserMenu}
        handleCloseUserMenu={handleCloseUserMenu}
      />
    </>
  )
}

export default NavBarContainer