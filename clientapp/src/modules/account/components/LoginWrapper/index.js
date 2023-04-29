import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import { Avatar, Container, Grid, Paper, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import styles from './styles'
import Copyright from '@movie/modules/shared/footers/components/Copyright'
import ForgotPassword from '@movie/modules/account/components/ForgotPassword'
import Login from '@movie/modules/account/components/Login'
import { Box } from '@mui/system'
import LeftRightSlide from '@movie/shared/slides/LeftRightSlide'

const LoginWrapper = ({ classes, isForgotPasswordOpen, handleForgotPassword, handleLogin }) => {
  const containerRef = useRef(null)

  return (
    <Container maxWidth='xs'>
      <Paper className={classes.rootPaper} ref={containerRef} sx={{ overflow: 'hidden' }}>
        <Grid container direction='column' spacing={2}>
          <Grid item className={classes.cardHeader}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5' align='center'>
              {isForgotPasswordOpen ? 'Forgot password' : 'Login'}
            </Typography>
          </Grid>
        </Grid>
        <LeftRightSlide
          in={isForgotPasswordOpen}
          mountOnEnter
          unmountOnExit
          container={containerRef.current}
        >
          <Box>
            <ForgotPassword handleForgotPassword={handleForgotPassword} />
          </Box>
        </LeftRightSlide>
        <LeftRightSlide
          in={!isForgotPasswordOpen}
          mountOnEnter
          unmountOnExit
          container={containerRef.current}
        >
          <Box>
            <Login handleLogin={handleLogin} />
          </Box>
        </LeftRightSlide>
      </Paper>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  )
}

LoginWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  isForgotPasswordOpen: PropTypes.bool.isRequired,
  handleForgotPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
}

export default withStyles(styles)(LoginWrapper)
