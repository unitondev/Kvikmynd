import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'

import styles from './styles'

const tabs = [
  
]

const NavbarTabs = ({ classes, isLogined, onClickLogout, fullName, avatar }) => {
  return <></>
}

NavbarTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  isLogined: PropTypes.bool,
  onClickLogout: PropTypes.func.isRequired,
  fullName: PropTypes.string,
  avatar: PropTypes.string,
}

export default withStyles(styles)(NavbarTabs)
