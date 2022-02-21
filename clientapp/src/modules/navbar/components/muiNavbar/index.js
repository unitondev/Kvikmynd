import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import { NavLink } from 'react-router-dom'
import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
} from '@mui/material'

import styles from './styles'
import routes from '@movie/routes'

const MuiNavbar = ({ classes, isLogined, onClickLogout, fullName, avatar }) => (
  <AppBar position='static'>
    <Container maxWidth='lg'>
      <Toolbar disableGutters>
        <Typography
          variant='h6'
          noWrap
          component='div'
          sx={{ mr: 2, display: 'flex' }}
        >
          LOGO
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <NavLink
            to={routes.root}
            className={classes.navBarLink}
            hover='true'
            activeClassName={classes.activeNavBarLink}
            exact
          >
            <ListItem>
              <ListItemText className={classes.listItemText} primary='Home' />
            </ListItem>
          </NavLink>
          {/* {
            isLogined
              ? null
              : (
              <NavLink
                to={routes.login}
                className={classes.navBarLink}
                hover='true'
                activeClassName={classes.activeNavBarLink}
              >
                <ListItem>
                  <ListItemText className={classes.listItemText} primary='Login' />
                </ListItem>
              </NavLink>
              )
          }
          {
            isLogined
              ? null
              : (
              <NavLink
                to={routes.register}
                className={classes.navBarLink}
                hover='true'
                activeClassName={classes.activeNavBarLink}
              >
                <ListItem>
                  <ListItemText className={classes.listItemText} primary='Register' />
                </ListItem>
              </NavLink>
              )
          } */}
          {/* {
            !isLogined
              ? null
              : (
              <NavLink
                to={routes.profile}
                className={classes.navBarLink}
                hover='true'
                activeClassName={classes.activeNavBarLink}
              >
                <ListItem>
                  <Avatar src={avatar} className={classes.avatarBlock} />
                  <ListItemText className={classes.listItemText} primary={fullName} />
                </ListItem>
              </NavLink>
              )
          }
          {
            !isLogined
              ? null
              : (
              <ListItem>
                <Button 
                  className={classes.navBarButton}
                  onClick={onClickLogout}
                  sx={{color: 'white'}}
                >
                  Logout
                </Button>
              </ListItem>
              )
          } */}
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
}

export default withStyles(styles)(MuiNavbar)
