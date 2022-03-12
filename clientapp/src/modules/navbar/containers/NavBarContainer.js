import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import _ from 'lodash'

import { logoutRequest } from '../../account/actions'
import { getUserAvatar, getIsLoginSucceeded } from '../../account/selectors'
import Navbar from '../components/NavBar'
import { ColorModeContext } from '../../../components/App/Theme'
import * as movieListActions from '@movie/modules/movieList/actions'
import { getMovieSearchList } from '@movie/modules/movieList/selectors'
import { addQueryToUrl } from '@movie/modules/movieList/helpers'
import routes from '@movie/routes'

const NavBarContainer = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  const isLogined = useSelector(getIsLoginSucceeded)
  const avatar = useSelector(getUserAvatar)
  const movieSearchList = useSelector(getMovieSearchList)
  const location = useSelector(state => state.router.location)
  const PageSize = 5

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
      dispatch(movieListActions.getMovieBySearchRequest({
        SearchQuery: searchQuery,
        PageSize,
      }))
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

  const generateUrlWithSearchQuery = useCallback((query) => {
    return addQueryToUrl('query', query, routes.search, location.search, ['page'])
  }, [location])

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
      pageSize={PageSize}
      generateUrlWithSearchQuery={generateUrlWithSearchQuery}
    />
  )
}

export default NavBarContainer
