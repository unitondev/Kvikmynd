import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'

import styles from './styles'
import { Button, Grid } from '@mui/material'
import { TextField } from 'formik-mui'
import { passwordRegex } from '@movie/modules/shared/forms/helpers/regex'

const initial = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().trim().required('Required'),
  newPassword: Yup.string()
    .required('Required')
    .min(6, 'Minimum length is 6 characters ')
    .max(128, 'Maximum length is 128 characters ')
    .notOneOf([Yup.ref('currentPassword'), null], 'Passwords must not match current password')
    .trim('There should be no spaces at the beginning and at the end of the password')
    .strict(true)
    .matches(
      passwordRegex,
      'Password must contain at least one upper case letter, one lower case letter, one digit and one special character'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match new password')
    .required('Required'),
})

const ChangePassword = ({ classes, handleChangePassword }) => {
  return (
    <Formik
      initialValues={initial}
      validationSchema={changePasswordSchema}
      onSubmit={(values, formikBag) => {
        handleChangePassword(values)
        formikBag.resetForm()
      }}
    >
      {({ dirty, isValid }) => (
        <Form autoComplete='off'>
          <Grid item>
            <Grid container direction='column' spacing={3}>
              <Grid item>
                <Field
                  name='currentPassword'
                  label='Current password'
                  type='password'
                  color='primary'
                  required
                  component={TextField}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <Field
                  name='newPassword'
                  label='New password'
                  type='password'
                  color='primary'
                  required
                  component={TextField}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <Field
                  name='confirmPassword'
                  label='Confirm your new password'
                  type='password'
                  color='primary'
                  required
                  component={TextField}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <Button
                  disabled={!(isValid && dirty)}
                  size='large'
                  fullWidth
                  color='primary'
                  variant='contained'
                  type='submit'
                >
                  Change password
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

ChangePassword.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChangePassword: PropTypes.func.isRequired,
}

export default withStyles(styles)(ChangePassword)
