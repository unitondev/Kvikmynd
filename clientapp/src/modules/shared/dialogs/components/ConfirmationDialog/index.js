import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import withStyles from '@mui/styles/withStyles'

import styles from './styles'

const ConfirmationDialog = ({
  classes,
  open,
  onClose,
  onSubmit,
  title,
  message,
  submitButtonText = 'Yes',
  cancelButtonText = 'No',
}) => {
  return (
    <Dialog className={classes.dialog} open={open}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{message && <DialogContentText>{message}</DialogContentText>}</DialogContent>
      <DialogActions>
        <Button onClick={onSubmit} color='primary'>
          {submitButtonText}
        </Button>
        <Button onClick={onClose} color='primary'>
          {cancelButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmationDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
}

export default withStyles(styles)(ConfirmationDialog)
