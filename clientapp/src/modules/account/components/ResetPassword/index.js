import React, { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-mui'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { Avatar, Box, Button, Container, Grid, IconButton, InputAdornment, Paper, Typography } from '@mui/material'
import LockReset from '@mui/icons-material/LockReset'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import Done from '@mui/icons-material/Done'

import { passwordRegex } from '@movie/shared/forms/helpers/regex'
import * as rawActions from '@movie/modules/account/actions'
import { getIsResetPasswordSucceeded } from '@movie/modules/account/selectors'
import routes from '@movie/routes'
import { accountActions } from '@movie/modules/account'

import styles from './styles'
import LeftRightSlide from '@movie/shared/slides/LeftRightSlide'

const initial = {
  newPassword: '',
  confirmPassword: '',
  showPassword: false,
}

const resetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('Required')
    .min(6, 'Minimum length is 6 characters ')
    .max(128, 'Maximum length is 128 characters ')
    .trim('There should be no spaces at the beginning and at the end of the password')
    .strict(true)
    .matches(passwordRegex, 'Password must contain at least one upper case letter, one lower case letter, one digit and one special character'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match new password')
    .required('Required'),
})

const ResetPassword = ({
   classes,
 }) => {
  const dispatch = useDispatch()
  const isResetPasswordSucceeded = useSelector(getIsResetPasswordSucceeded)
  const locationQuery = useSelector(state => state.router.location.query)
  const { token, email } = locationQuery
  const containerRef = useRef(null)

  const handleSubmitResetPassword = useCallback((values) => {
    const { newPassword } = values
    token && email && dispatch(rawActions.resetPasswordRequest({ Token: token, Email: email, Password: newPassword }))
  }, [dispatch, email, token])

  useEffect(() => {
    return () => {
      dispatch(accountActions.resetForgotPassword())
    }
  }, [dispatch])

  return (
    <Container maxWidth='xs'>
      <Paper className={classes.rootPaper} ref={containerRef}>
        <Grid container direction='column' spacing={2}>
          <Grid item className={classes.cardHeader}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              {
                isResetPasswordSucceeded
                  ? <Done />
                  : <LockReset />
              }
            </Avatar>
            <Typography component='h1' variant='h5' align='center'>
              Reset password
            </Typography>
          </Grid>
        </Grid>
        <LeftRightSlide in={isResetPasswordSucceeded} mountOnEnter unmountOnExit container={containerRef.current}>
          <Grid item>
            <Typography sx={{ display: 'inline' }}>
              Your password was successfully updated. You can {' '}
            </Typography>
            <Typography sx={{ display: 'inline' }} component={Link} to={routes.login}>
              login with the new password.
            </Typography>
          </Grid>
        </LeftRightSlide>
        <LeftRightSlide in={!isResetPasswordSucceeded} mountOnEnter unmountOnExit container={containerRef.current}>
          <Box>
            <Formik
              initialValues={initial}
              validationSchema={resetPasswordSchema}
              onSubmit={handleSubmitResetPassword}
            >
              {({ dirty, isValid, values, setFieldValue }) => (
                <Form>
                  <Grid container direction='column' spacing={2}>
                    <Grid item>
                      <Field
                        name='newPassword'
                        label='New password'
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
                          </InputAdornment>,
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        name='confirmPassword'
                        label='Confirm your new password'
                        type={values.showPassword ? 'text' : 'password'}
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
                        Reset password
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </LeftRightSlide>
      </Paper>
    </Container>
  )
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ResetPassword)
