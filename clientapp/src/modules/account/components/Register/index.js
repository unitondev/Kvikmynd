import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@mui/material'
import { Form, Formik, Field } from 'formik'
import { TextField } from 'formik-mui'
import * as Yup from 'yup'

import { AvatarPreview } from '../../helpers'
import styles from './styles'

const initial = {
  email: '',
  password: '',
  fullName: '',
  userName: '',
  avatar: null,
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
    .trim('There should be no spaces at the beginning and at the end of the password'),
  fullName: Yup.string()
    .max(25, 'Maximum length is 25 characters')
    .required('Required'),
  userName: Yup.string()
    .max(256, 'Maximum length is 256 characters')
    .required('Required'),
})

const Register = ({
  classes,
  handleRegister
}) => {
  const uploadInputRef = useRef(null)
  return (
    <Container maxWidth='xs'>
      <Paper className={classes.rootPaper}>
        <Formik
            initialValues={initial}
            validationSchema={registerSchema}
            onSubmit={(values, formikBag) => {
              handleRegister(values)
              formikBag.resetForm()
          }}
        >
          {({ dirty, isValid, values, setFieldValue }) => (
            <Form autoComplete='off'>
              <Grid container direction='column' spacing={2}>
                <Grid item>
                  <Typography variant='h2' component='h2' align='center'>
                    Register
                  </Typography>
                </Grid>
                <Grid item className={classes.avatarGrid}>
                  {
                    !!values.avatar
                    ?
                      <AvatarPreview file={values.avatar} className={classes.avatarBig}/>
                    : 
                      <Avatar className={classes.avatarBig}/>
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
                    size='large'
                    fullWidth
                    color='primary'
                    variant='contained'
                    onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
                  >
                    Upload photo
                  </Button>
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
                  <Field
                    name='fullName'
                    label='Full name'
                    color='primary'
                    required
                    component={TextField}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Field
                    name='userName'
                    label='User name'
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
                    Register
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  )
}

Register.propTypes = {
  handleRegister: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Register)
