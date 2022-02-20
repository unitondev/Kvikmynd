import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import { TextField } from '@mui/material'
import { get } from 'lodash'

import styles from './styles'

const TextFieldFormik = ({
  classes,
  form,
  field,
  helperText = '',
  ...props
}) => {
  const { isSubmitting, touched, errors } = form
  
  const fieldError = get(errors, field.name)
  const showError = get(touched, field.name) && !!fieldError

  return (
    <TextField
      error={showError}
      helperText={showError ? fieldError : helperText}
      disabled={isSubmitting}
      value={field.value || ''}
      {...field}
      {...props}
    >
    
    </TextField>
  )
}

TextFieldFormik.propTypes = {
  classes: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  helperText: PropTypes.string,
}

export default withStyles(styles)(TextFieldFormik)