import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import _ from 'lodash'

import { logoutRequest } from '../../account/actions'
import { getUserAvatar, getIsLoginSucceeded } from '../../account/selectors'
import Navbar from '../components/NavBar'
import { ColorModeContext } from '../../../components/App/Theme'
import * as movieListActions from '@movie/modules/movieList/actions'
import { getMovieSearchList } from '@movie/modules/movieList/selectors'

const NavBarContainer = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  const isLogined = useSelector(getIsLoginSucceeded)
  const avatar = useSelector(getUserAvatar)
  const movieSearchList = useSelector(getMovieSearchList)

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

  const [searchQuery, setSearchQuery] = useState('')
  const inputRef = useRef(null)

  const handleChangeSearchValue = (searchText) => {
    setSearchQuery(searchText)
  }

  const debouncedSearchQuery = useRef(
    _.debounce((searchQuery) => {
      dispatch(movieListActions.getMovieBySearchRequest({SearchQuery: searchQuery}))
    }, 1000)
  ).current

  useEffect(() => {
    searchQuery && debouncedSearchQuery(searchQuery)
  }, [searchQuery])

  const handleCloseSearch = () => {
    dispatch(movieListActions.resetMovieBySearch())
    setSearchQuery('')
    inputRef.current.blur()
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
      searchQuery={searchQuery}
      handleChangeSearchValue={handleChangeSearchValue}
      movieSearchList={movieSearchList}
      handleCloseSearch={handleCloseSearch}
      inputRef={inputRef}
    />
  )
}

export default NavBarContainer
