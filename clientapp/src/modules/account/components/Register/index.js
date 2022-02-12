import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles';
import { Avatar, Button, TextField, Typography } from '@mui/material'

import { Notifications } from '../../../shared/snackBarNotification'
import { NavBar } from '../../../navbar'
import { AvatarPreview } from '../../helpers'
import styles from './styles'

const Register = ({ classes, onSubmitForm, formik, handleSelectingFile }) => (
  <div>
    <Notifications />
    <NavBar />
    <div className={classes.viewTitleBlock}>
      <Typography variant='h2' component='h2' className={classes.viewTitleText}>
        Register
      </Typography>
    </div>
    <div className={classes.registerFormBlock}>
      <form className={classes.registerForm} onSubmit={onSubmitForm}>
        {
          !!formik.values.avatar
            ? (
              <AvatarPreview file={formik.values.avatar} classes={classes.avatarBig} />
            )
            : (
              <Avatar className={classes.avatarBig} />
            )
        }
        <input
          type='file'
          name='avatar'
          accept='image/*'
          onChange={handleSelectingFile}
          className={classes.inputFile}
        />
        <TextField
          error={!!(formik.touched.email && formik.errors.email)}
          helperText={
            !!(formik.touched.email && formik.errors.email) === false ? null : formik.errors.email
          }
          label='Email'
          type='text'
          className={classes.textField}
          variant='outlined'
          {...formik.getFieldProps('email')}
        />
        <TextField
          error={!!(formik.touched.userName && formik.errors.userName)}
          helperText={
            !!(formik.touched.userName && formik.errors.userName) === false
              ? null
              : formik.errors.userName
          }
          label='User Name'
          type='text'
          className={classes.textField}
          variant='outlined'
          {...formik.getFieldProps('userName')}
        />
        <TextField
          error={!!(formik.touched.fullName && formik.errors.fullName)}
          helperText={
            !!(formik.touched.fullName && formik.errors.fullName) === false
              ? null
              : formik.errors.fullName
          }
          label='Full Name'
          type='text'
          className={classes.textField}
          variant='outlined'
          {...formik.getFieldProps('fullName')}
        />
        <TextField
          error={!!(formik.touched.password && formik.errors.password)}
          helperText={
            !!(formik.touched.password && formik.errors.password) === false
              ? null
              : formik.errors.password
          }
          label='Password'
          type='password'
          className={classes.textField}
          variant='outlined'
          {...formik.getFieldProps('password')}
        />
        <Button variant='outlined' color='primary' type='submit'>
          Register
        </Button>
      </form>
    </div>
  </div>
)

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  formik: PropTypes.object.isRequired,
  handleSelectingFile: PropTypes.func.isRequired,
}

export default withStyles(styles)(Register)
