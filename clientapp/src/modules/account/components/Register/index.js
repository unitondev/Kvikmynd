import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material'
import { Form, Formik, Field } from 'formik'
import { TextField } from 'formik-mui'
import * as Yup from 'yup'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Done from '@mui/icons-material/Done'

import { AvatarPreview } from '../../helpers'
import { passwordRegex } from '@movie/modules/shared/forms/helpers/regex'
import Copyright from '@movie/modules/shared/footers/components/Copyright'
import routes from '@movie/routes'
import { getIsUserLoading } from '@movie/modules/account/selectors'
import styles from './styles'
import LeftRightSlide from '@movie/shared/slides/LeftRightSlide'

const initial = {
  email: '',
  password: '',
  fullName: '',
  userName: '',
  avatar: null,
  showPassword: false,
}

const registerSchema = Yup.object().shape({
  email: Yup.string()
    .required('Required')
    .max(256, 'Maximum length is 256 characters')
    .email('Invalid email'),
  password: Yup.string()
    .required('Required')
    .min(6, 'Minimum length is 6 characters')
    .max(128, 'Maximum length is 128 characters')
    .trim('There should be no spaces at the beginning and at the end of the password')
    .strict(true)
    .matches(passwordRegex, 'Password must contain at least one upper case letter, one lower case letter, one digit and one special character'),
  fullName: Yup.string()
    .max(25, 'Maximum length is 25 characters')
    .required('Required'),
  userName: Yup.string()
    .max(256, 'Maximum length is 256 characters')
    .required('Required'),
})

const Register = ({
  classes,
  handleRegister,
  isRegisterSucceeded,
}) => {
  const uploadInputRef = useRef(null)
  const isLoading = useSelector(getIsUserLoading)
  const containerRef = useRef(null)

  return (
    <Container maxWidth='sm'>
      {isLoading && <LinearProgress sx={{ borderRadius: 10 }} />}
      <Paper className={classes.rootPaper} ref={containerRef}>
        <Grid container direction='column' spacing={2}>
          <Grid item className={classes.cardHeader}>
            <Avatar sx={{ m: 1 }} className={isRegisterSucceeded ? classes.avatarBlockSucceeded : classes.avatarBlock}>
              {
                isRegisterSucceeded
                  ? <Done />
                  : <LockOutlinedIcon />
              }

            </Avatar>
            <Typography component='h1' variant='h5' align='center'>
              Register
            </Typography>
          </Grid>
        </Grid>
        {
          isRegisterSucceeded
            ? (
              <Typography>
                Registration completed successfully. Please, follow the link sent to your email to confirm register and login.
              </Typography>
            )
            : (
              <LeftRightSlide in mountOnEnter unmountOnExit container={containerRef.current}>
                <div>
                  <Formik
                    initialValues={initial}
                    validationSchema={registerSchema}
                    onSubmit={(values, formikBag) => {
                      handleRegister(values)
                      formikBag.resetForm()
                    }}
                  >
                    {({ dirty, isValid, values, setFieldValue }) => (
                      <Form>
                        <Grid container direction='column' spacing={2}>
                          <Grid item className={classes.avatarGrid}>
                            {
                              !!values.avatar
                                ?
                                <AvatarPreview file={values.avatar} className={classes.avatarBig} />
                                :
                                <Avatar className={classes.avatarBig} />
                            }
                          </Grid>
                          <Grid item>
                            <input
                              type='file'
                              name='avatar'
                              accept='image/*'
                              onChange={(e) => setFieldValue('avatar', e.currentTarget.files[0])}
                              hidden
                              ref={uploadInputRef}
                            />
                            <Button
                              fullWidth
                              color='primary'
                              variant='contained'
                              onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
                            >
                              Upload photo
                            </Button>
                          </Grid>
                          <Grid item container direction='row' spacing={2}>
                            <Grid item xs={6}>
                              <Field
                                name='fullName'
                                label='Full name'
                                color='primary'
                                required
                                component={TextField}
                                fullWidth
                                autoFocus
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
                          <Grid item container direction='row' spacing={4}>
                            <Grid item xs={6}>
                              <Button
                                color='primary'
                                variant='text'
                                component={Link}
                                to={routes.login}
                              >
                                Log in
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
                                Register
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                </div>
              </LeftRightSlide>
            )
        }
      </Paper>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  )
}

Register.propTypes = {
  handleRegister: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  isRegisterSucceeded: PropTypes.bool.isRequired,
}

export default withStyles(styles)(Register)
