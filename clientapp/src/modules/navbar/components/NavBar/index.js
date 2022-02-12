import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles';
import { NavLink } from 'react-router-dom'
import { Avatar, List, ListItem, ListItemText } from '@mui/material'

import styles from './styles'

const NavBar = ({ classes, isLogined, onClickLogout, fullName, avatar }) => (
  <nav className={classes.navbarBlock}>
    <List
      component='nav'
      className={`${classes.root} ${classes.profileSectionsBlock}`}
      aria-label='mailbox folders'
    >
      <NavLink
        to='/'
        className={classes.navBarLink}
        hover='true'
        activeClassName={classes.activeNavBarLink}
        exact
      >
        <ListItem>
          <ListItemText className={classes.listItemText} primary='Home' />
        </ListItem>
      </NavLink>
      {
        isLogined
          ? null
          : (
          <NavLink
            to='/login'
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
            to='/register'
            className={classes.navBarLink}
            hover='true'
            activeClassName={classes.activeNavBarLink}
          >
            <ListItem>
              <ListItemText className={classes.listItemText} primary='Register' />
            </ListItem>
          </NavLink>
          )
      }
      {
        !isLogined
          ? null
          : (
          <NavLink
            to='/profile'
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
            <button className={classes.navBarButton} onClick={onClickLogout}>
              Logout
            </button>
          </ListItem>
          )
      }
    </List>
  </nav>
)

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  isLogined: PropTypes.bool,
  onClickLogout: PropTypes.func.isRequired,
  fullName: PropTypes.string,
  avatar: PropTypes.string,
}

export default withStyles(styles)(NavBar)
