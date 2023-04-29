import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'

import styles from './styles'

const NotFound = ({ classes }) => <div className={classes.gifBlock}></div>

NotFound.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NotFound)
