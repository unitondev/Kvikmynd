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
} from '@mui/material'
import { Logout } from '@mui/icons-material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

import styles from './styles'
import routes from '@movie/routes'
import NavbarTabs from '../NavbarTabs'
import ElevationScroll from '../ElevationScroll'

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
}) => (
  <ElevationScroll>
    <>
      <AppBar color='primary'>
        <Container maxWidth='lg'>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              <NavbarTabs />
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
                    sx={{ mt: '45px'}}
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
                      <Avatar src={avatar} sx={{ width: 24, height: 24 }}/>
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
                  <Button component={Link} to={routes.login} sx={{ color: 'white' }}>
                    Login
                  </Button>
                  <Button component={Link} to={routes.register} sx={{ color: 'white' }}>
                    Register
                  </Button>
                </>
              }
              
            </Box>
            <Box sx={{ flexGrow: 0 }}>
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
}

export default withStyles(styles)(Navbar)
