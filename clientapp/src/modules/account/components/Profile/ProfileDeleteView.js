import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import { Button } from '@mui/material'

import styles from './styles'

const ProfileDeleteView = ({ classes, deleteAccount }) => (
  <div className={classes.profileBlock}>
    <div className={classes.buttonBlock}>
      <Button variant='contained' className={classes.updateButton} onClick={deleteAccount}>
        Delete my account
      </Button>
    </div>
  </div>
)

ProfileDeleteView.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
}

export default withStyles(styles)(ProfileDeleteView)
