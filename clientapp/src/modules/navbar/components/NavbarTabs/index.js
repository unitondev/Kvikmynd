import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

import styles from './styles'
import routes from '@movie/routes'

const tabs = [
  {
    route: routes.root,
    label: 'MOVIESITE',
  },
]

const NavbarTabs = ({ classes }) => {
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
}

export default withStyles(styles)(NavbarTabs)
