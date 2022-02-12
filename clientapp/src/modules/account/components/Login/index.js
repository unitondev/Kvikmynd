import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles';
import { Button, TextField, Typography } from '@mui/material'

import { Notifications } from '../../../shared/snackBarNotification'
import { NavBar } from '../../../navbar'
import styles from './styles'

const Login = ({
  classes,
  onSubmitForm,
  touchedEmail,
  emailErrors,
  touchedPassword,
  passwordError,
  emailFieldProps,
  passwordFieldProps,
}) => (
  <>
    <Notifications />
    <NavBar />
    <div className={classes.viewTitleBlock}>
      <Typography variant='h2' component='h2' className={classes.viewTitleText}>
        Login
      </Typography>
    </div>
    <div className={classes.loginFormBlock}>
      <form className={classes.loginForm} onSubmit={onSubmitForm}>
        <TextField
          error={!!(touchedEmail && emailErrors)}
          helperText={!!(touchedEmail && emailErrors) === false ? null : emailErrors}
          label='Email'
          type='text'
          className={classes.textField}
          variant='outlined'
          {...emailFieldProps}
        />
        <TextField
          error={!!(touchedPassword && passwordError)}
          helperText={!!(touchedPassword && passwordError) === false ? null : passwordError}
          label='Password'
          type='password'
          className={classes.textField}
          variant='outlined'
          {...passwordFieldProps}
        />
        <Button variant='outlined' color='primary' type='submit'>
          Login
        </Button>
      </form>
    </div>
  </>
)

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  touchedEmail: PropTypes.bool,
  emailErrors: PropTypes.string,
  touchedPassword: PropTypes.bool,
  passwordError: PropTypes.string,
  emailFieldProps: PropTypes.object.isRequired,
  passwordFieldProps: PropTypes.object.isRequired,
}

export default withStyles(styles)(Login)
