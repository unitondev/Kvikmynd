import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'

import styles from './styles'
import { Button, Divider, Grid } from '@mui/material'
import { TextField } from 'formik-mui'

const accountInfoSchema = Yup.object().shape({
  fullName: Yup.string().trim().required('Required').max(25, 'Maximum length is 25 characters'),
  userName: Yup.string().trim().required('Required').max(256, 'Maximum length is 256 characters'),
  email: Yup.string()
    .trim()
    .required('Required')
    .email()
    .max(256, 'Maximum length is 256 characters'),
})

const AccountInfo = ({ classes, user, handleUpdateAccount, handleDeleteAccount }) => {
  return (
    <Formik
      initialValues={user}
      enableReinitialize
      validationSchema={accountInfoSchema}
      onSubmit={handleUpdateAccount}
    >
      {({ dirty, isValid }) => (
        <Form autoComplete='off'>
          <Grid item>
            <Grid container direction='column' spacing={3}>
              <Grid item>
                <Grid container direction='row' spacing={1}>
                  <Grid item xs={6}>
                    <Field
                      name='fullName'
                      label='Full name'
                      color='primary'
                      required
                      component={TextField}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name='userName'
                      label='User name'
                      color='primary'
                      required
                      component={TextField}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Field
                  name='email'
                  label='Email'
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
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Divider className={classes.divider} />
              </Grid>
              <Grid item>
                <Button
                  size='large'
                  fullWidth
                  color='primary'
                  variant='contained'
                  onClick={handleDeleteAccount}
                >
                  Delete my account
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

AccountInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleUpdateAccount: PropTypes.func.isRequired,
  handleDeleteAccount: PropTypes.func.isRequired,
}

export default withStyles(styles)(AccountInfo)
