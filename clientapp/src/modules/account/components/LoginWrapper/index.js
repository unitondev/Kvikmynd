import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import { Avatar, Container, Grid, Paper, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import styles from './styles'
import Copyright from '@movie/modules/shared/footers/components/Copyright'
import ForgotPassword from '@movie/modules/account/components/ForgotPassword'
import Login from '@movie/modules/account/components/Login'

const LoginWrapper = ({
  classes,
  isForgotPasswordOpen,
  handleForgotPassword,
  handleLogin,
}) => (
  <Container maxWidth='xs'>
    <Paper className={classes.rootPaper}>
      <Grid container direction='column' spacing={2}>
        <Grid item className={classes.cardHeader}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5' align='center'>
            Login
          </Typography>
        </Grid>
      </Grid>
      {
        isForgotPasswordOpen
          ? (
            <ForgotPassword
              handleForgotPassword={handleForgotPassword}
            />
          )
          : (
            <Login
              handleLogin={handleLogin}
            />
          )
      }
    </Paper>
    <Copyright sx={{ mt: 5 }} />
  </Container>
)

LoginWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  isForgotPasswordOpen: PropTypes.bool.isRequired,
  handleForgotPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
}

export default withStyles(styles)(LoginWrapper)
