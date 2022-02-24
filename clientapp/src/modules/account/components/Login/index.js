import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles';
import { Button, Container, Grid, Paper, Typography } from '@mui/material'
import { TextField } from 'formik-mui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import styles from './styles'

const initial = {
  email: '',
  password: '',
}

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Required')
    .max(256, 'Maximum length is 256 characters')
    .email('Invalid email'),
  password: Yup.string()
    .required('Required')
    .min(6, 'Minimum length is 6 characters')
    .max(128, 'Maximum length is 128 characters')
    .trim('There should be no spaces at the beginning and at the end of the password'),
})

const Login = ({
  classes,
  handleLogin,
}) => (
  <Container maxWidth='xs'>
    <Paper className={classes.rootPaper}>
      <Formik
        initialValues={initial}
        validationSchema={loginSchema}
        onSubmit={(values, formikBag) => {
          handleLogin(values)
          formikBag.resetForm()
      }}
      >
        {({ dirty, isValid }) => (
          <Form autoComplete='off'>
            <Grid container direction='column' spacing={2}>
              <Grid item>
                <Typography variant='h2' component='h2' align='center'>
                  Login
                </Typography>
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
                <Field
                  name='password'
                  label='Password'
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
                  Login
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  </Container>
)

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired,
}

export default withStyles(styles)(Login)
