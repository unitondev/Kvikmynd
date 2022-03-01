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
  ListItemIcon, TextField, InputAdornment, Autocomplete, ListItem, ListItemAvatar, ListItemText,
} from '@mui/material'
import { Logout } from '@mui/icons-material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import SearchIcon from '@mui/icons-material/Search'

import styles from './styles'
import routes, { movie } from '@movie/routes'
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
                options={movieSearchList}
                getOptionLabel={option => option.title}
                onClose={handleCloseSearch}
                blurOnSelect
                clearOnBlur
                clearOnEscape
                classes={{
                  input: classes.input,
                }}
                renderOption={(props, option) => {
                  const movieRating = calculateMovieRating(option.ratings)
                  return (
                    <ListItem key={option.id} alignItems='flex-start' component={Link} to={routes.movie(option.id)}>
                      <ListItemAvatar>
                        <Avatar alr={option.title} src={option.cover} variant='square' style={{
                          width: 36,
                          height: 64,
                        }} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={option.title}
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
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className={classes.search}
                    variant='outlined'
                    size='small'
                    placeholder='Search...'
                    color='primary'
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position='start'>
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={searchQuery}
                    onChange={(e) => handleChangeSearchValue(e.target.value)}
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
                    <Button component={Link} to={routes.login} color='primary'>
                      Login
                    </Button>
                    <Button component={Link} to={routes.register} color='primary'>
                      Register
                    </Button>
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
  movieSearchList: PropTypes.array,
  handleCloseSearch: PropTypes.func.isRequired,
}

export default withStyles(styles)(Navbar)
