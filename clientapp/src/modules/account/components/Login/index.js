import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import { Avatar, Button, Container, Grid, IconButton, InputAdornment, Paper, Typography } from '@mui/material'
import { TextField } from 'formik-mui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Link } from 'react-router-dom'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import styles from './styles'
import routes from '@movie/routes'
import Copyright from '@movie/modules/shared/footers/components/Copyright'

const initial = {
  email: '',
  password: '',
  showPassword: false,
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
        {({ dirty, isValid, values, setFieldValue }) => (
          <Form>
            <Grid container direction='column' spacing={2}>
              <Grid item className={classes.cardHeader}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5' align='center'>
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
                  autoFocus
                />
              </Grid>
              <Grid item>
                <Field
                  name='password'
                  label='Password'
                  type={values.showPassword ? 'text' : 'password'}
                  color='primary'
                  required
                  component={TextField}
                  fullWidth
                  InputProps={{
                    endAdornment: <InputAdornment position='end'>
                      <IconButton
                        onClick={() => setFieldValue('showPassword', !values.showPassword)}
                        edge='end'
                      >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }}
                />
              </Grid>
              <Grid item container direction='row' spacing={4}>
                <Grid item xs={6}>
                  <Button
                    color='primary'
                    variant='text'
                    component={Link}
                    to={routes.register}
                  >
                    Create account
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    disabled={!(isValid && dirty)}
                    fullWidth
                    color='primary'
                    variant='contained'
                    type='submit'
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
    <Copyright sx={{ mt: 5 }} />
  </Container>
)

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired,
}

export default withStyles(styles)(Login)
