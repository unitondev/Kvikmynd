import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import { Link } from 'react-router-dom'
import {
  Avatar,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  TextField,
  InputAdornment,
  Autocomplete,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
} from '@mui/material'
import { Logout } from '@mui/icons-material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import SearchIcon from '@mui/icons-material/Search'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import GradeIcon from '@mui/icons-material/Grade'
import ArchiveIcon from '@mui/icons-material/Archive'

import styles from './styles'
import routes  from '@movie/routes'
import NavbarTabs from '../NavbarTabs'
import ElevationScroll from '../ElevationScroll'
import { calculateMovieRating } from '@movie/modules/movie/helpers'
import { setColorBasedOnRating } from '@movie/modules/navbar/helpers'

const Navbar = ({
  classes,
  isLogined,
  onClickLogout,
  avatar,
  anchorUser,
  handleOpenUserMenu,
  handleCloseUserMenu,
  theme,
  toggleColorMode,
  searchQuery,
  handleChangeSearchValue,
  movieSearchList,
  handleCloseSearch,
  inputRef,
  pageSize,
  generateUrlWithSearchQuery,
  pathname,
  hasEditMoviePermission,
}) => (
  <ElevationScroll>
    <>
      <AppBar color='transparent' className={classes.appbar}
      >
        <Container maxWidth='lg'>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              <NavbarTabs />
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Autocomplete
                freeSolo
                options={movieSearchList.items}
                getOptionLabel={option => option.title}
                onClose={handleCloseSearch}
                blurOnSelect
                clearOnBlur
                clearOnEscape
                classes={{
                  input: classes.input,
                }}
                filterOptions={((options, state) => {
                  if (options.length > 0 && movieSearchList.totalCount > pageSize) {
                    options.push({
                      id: 0,
                      title: '',
                    })
                  }
                  return options
                })}
                renderOption={(props, option) => {
                  if (option.id === 0) {
                    return (
                      <ListItemButton {...props} className={classes.centeredBlock} component={Link} to={generateUrlWithSearchQuery(searchQuery)} onClick={handleCloseSearch}>
                        <ListItemIcon className={classes.centeredBlock}>
                          <MoreHorizIcon />
                        </ListItemIcon>
                      </ListItemButton>
                    )
                  }

                  const movieRating = calculateMovieRating(option.ratings)
                  return (
                    <ListItem {...props} alignItems='flex-start' component={Link} to={routes.movie(option.id)} onClick={handleCloseSearch}>
                      <ListItemAvatar>
                        <Avatar alr={option.title} src={option.coverUrl} variant='square' style={{
                          width: 36,
                          height: 64,
                        }} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${option.title} ${option.year ? `(${option.year})` : ''}`}
                        primaryTypographyProps={{
                          variant: 'body2',
                        }}
                        secondary={movieRating !== 0 ? movieRating : 'No rating'}
                        secondaryTypographyProps={{
                          fontWeight: 600,
                          color: setColorBasedOnRating(movieRating),
                        }}
                      />
                    </ListItem>
                )}}
                inputValue={searchQuery}
                onInputChange={(event, value) => handleChangeSearchValue(value)}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    className={classes.search}
                    variant='outlined'
                    size='small'
                    placeholder='Search...'
                    color='primary'
                    InputProps={{
                      ...props.InputProps,
                      startAdornment: (
                        <InputAdornment position='start'>
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    inputRef={inputRef}
                  />
                )}
              />
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {
                isLogined
                  ?
                  <>
                    <IconButton onClick={handleOpenUserMenu}>
                      <Avatar src={avatar} className={classes.avatarBlock} />
                    </IconButton>
                    <Menu
                      sx={{ mt: '45px' }}
                      anchorEl={anchorUser}
                      open={Boolean(anchorUser)}
                      onClose={handleCloseUserMenu}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <MenuItem component={Link} to={routes.profile} onClick={handleCloseUserMenu}>
                        <ListItemIcon>
                          <Avatar src={avatar} className={classes.menuAvatar} />
                        </ListItemIcon>
                        <Typography textAlign='center'>Profile</Typography>
                      </MenuItem>
                      <MenuItem component={Link} to={routes.myRatings} onClick={handleCloseUserMenu}>
                        <ListItemIcon>
                          <GradeIcon />
                        </ListItemIcon>
                        <Typography textAlign='center'>My ratings</Typography>
                      </MenuItem>
                      <MenuItem component={Link} to={routes.bookmarks} onClick={handleCloseUserMenu}>
                        <ListItemIcon>
                          <BookmarkIcon />
                        </ListItemIcon>
                        <Typography textAlign='center'>Bookmarks</Typography>
                      </MenuItem>
                      {
                        hasEditMoviePermission && (
                          <MenuItem component={Link} to={routes.archived} onClick={handleCloseUserMenu}>
                            <ListItemIcon>
                              <ArchiveIcon />
                            </ListItemIcon>
                            <Typography textAlign='center'>Archive</Typography>
                          </MenuItem>
                        )
                      }
                      <MenuItem onClick={() => {
                        onClickLogout()
                        handleCloseUserMenu()
                      }}>
                        <ListItemIcon>
                          <Logout />
                        </ListItemIcon>
                        <Typography textAlign='center'>Logout</Typography>
                      </MenuItem>
                    </Menu>
                  </>
                  :
                  <>
                    {
                      !pathname.startsWith(routes.login) && (
                        <Button component={Link} to={routes.login} color='primary'>
                          Login
                        </Button>
                      )
                    }
                    {
                      !pathname.startsWith(routes.register) && (
                        <Button component={Link} to={routes.register} color='primary'>
                          Register
                        </Button>
                      )
                    }
                  </>
              }
              <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color='inherit'>
                {
                  theme.palette.mode === 'dark'
                    ? <Brightness7Icon />
                    : <Brightness4Icon />
                }
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar id='back-to-top-anchor' />
    </>
  </ElevationScroll>
)

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  isLogined: PropTypes.bool,
  avatar: PropTypes.string,
  onClickLogout: PropTypes.func.isRequired,
  anchorUser: PropTypes.object,
  handleOpenUserMenu: PropTypes.func.isRequired,
  handleCloseUserMenu: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  toggleColorMode: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  handleChangeSearchValue: PropTypes.func.isRequired,
  movieSearchList: PropTypes.shape({
    items: PropTypes.array,
    totalCount: PropTypes.number.isRequired,
  }),
  handleCloseSearch: PropTypes.func.isRequired,
  inputRef: PropTypes.object.isRequired,
  pageSize: PropTypes.number.isRequired,
  generateUrlWithSearchQuery: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  hasEditMoviePermission: PropTypes.bool.isRequired,
}

export default withStyles(styles)(Navbar)
