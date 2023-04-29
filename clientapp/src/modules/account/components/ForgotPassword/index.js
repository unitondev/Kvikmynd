import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import { Button, Grid, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-mui'
import * as Yup from 'yup'

import styles from './styles'
import { Link } from 'react-router-dom'
import routes from '@movie/routes'
import { useSelector } from 'react-redux'
import { getIsForgotPasswordSucceeded } from '@movie/modules/account/selectors'
import LeftRightSlide from '@movie/shared/slides/LeftRightSlide'

const initialValuesEmail = {
  email: '',
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required('Required')
    .max(256, 'Maximum length is 256 characters')
    .email('Invalid email'),
})

const ForgotPassword = ({ classes, handleForgotPassword }) => {
  const isForgotPasswordSucceeded = useSelector(getIsForgotPasswordSucceeded)

  return (
    <>
      <LeftRightSlide in={isForgotPasswordSucceeded} mountOnEnter unmountOnExit>
        <Typography>To reset your password, follow the link sent to your email.</Typography>
      </LeftRightSlide>
      <LeftRightSlide in={!isForgotPasswordSucceeded} mountOnEnter unmountOnExit>
        <div>
          <Formik
            initialValues={initialValuesEmail}
            validationSchema={forgotPasswordSchema}
            onSubmit={handleForgotPassword}
          >
            {({ dirty, isValid }) => (
              <Form>
                <Grid container direction='column' spacing={2}>
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
                  <Grid item container direction='row' spacing={4}>
                    <Grid item xs={6}>
                      <Button
                        color='primary'
                        variant='text'
                        fullWidth
                        component={Link}
                        to={routes.login}
                      >
                        Back
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        disabled={!(isValid && dirty)}
                        color='primary'
                        variant='contained'
                        type='submit'
                        fullWidth
                      >
                        Next
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </LeftRightSlide>
    </>
  )
}

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  handleForgotPassword: PropTypes.func.isRequired,
}

export default withStyles(styles)(ForgotPassword)
