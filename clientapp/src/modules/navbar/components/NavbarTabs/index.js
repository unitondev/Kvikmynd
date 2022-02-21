import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import { Link } from 'react-router-dom'

import styles from './styles'
import routes from '@movie/routes'
import { Button } from '@mui/material'

const tabs = [
  {
    route: routes.root,
    label: 'LOGO',
  },
]

const NavbarTabs = ({ classes, isLogined, onClickLogout, fullName, avatar }) => {
  return (
    <>
      {tabs.map((tab) => (
        <Button key={tab.label} component={Link} to={tab.route} sx={{ color: 'white' }}>
          {tab.label}
        </Button>
      ))}
    </>
  )
}

NavbarTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  isLogined: PropTypes.bool,
  onClickLogout: PropTypes.func,
  fullName: PropTypes.string,
  avatar: PropTypes.string,
}

export default withStyles(styles)(NavbarTabs)
