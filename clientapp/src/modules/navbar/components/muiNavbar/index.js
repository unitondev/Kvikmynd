import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import { Link, NavLink } from 'react-router-dom'
import {
  Avatar,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'

import styles from './styles'
import routes from '@movie/routes'
import NavbarTabs from '../NavbarTabs'

const settings = [
  {
    route: routes.profile,
    label: 'Profile',
  },
  {
    route: routes.root,
    label: 'Logout',
  }, 
]

const MuiNavbar = ({ 
  classes,
  isLogined,
  onClickLogout,
  fullName,
  avatar,
  anchorUser,
  handleOpenUserMenu,
  handleCloseUserMenu,
}) => (
  <AppBar position='static'>
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
              {
                settings.map(setting => (
                  <MenuItem key={setting.label} component={Link} to={setting.route}>
                    <Typography textAlign='center'>{setting.label}</Typography>
                  </MenuItem>
                ))
              }
              </Menu>
            </>
            : 
            <Button component={Link} to={routes.login} sx={{ color: 'white' }}>
              Login
            </Button>
          }
          
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
)

MuiNavbar.propTypes = {
  classes: PropTypes.object.isRequired,
  isLogined: PropTypes.bool,
  onClickLogout: PropTypes.func.isRequired,
  fullName: PropTypes.string,
  avatar: PropTypes.string,
  anchorUser: PropTypes.object,
  handleOpenUserMenu: PropTypes.func.isRequired,
  handleCloseUserMenu: PropTypes.func.isRequired,
}

export default withStyles(styles)(MuiNavbar)
