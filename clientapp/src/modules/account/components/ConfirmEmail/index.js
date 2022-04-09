import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import {
  Avatar,
  Container,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material'
import Done from '@mui/icons-material/Done'
import Email from '@mui/icons-material/Email'

import { getIsConfirmEmailSucceeded, getIsUserLoading } from '@movie/modules/account/selectors'
import * as rawAction from '@movie/modules/account/actions'
import LeftRightSlide from '@movie/shared/slides/LeftRightSlide'
import styles from './styles'

const ConfirmEmail = ({
  classes,
}) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(getIsUserLoading)
  const isConfirmEmailSucceeded = useSelector(getIsConfirmEmailSucceeded)
  const locationQuery = useSelector(state => state.router.location.query)

  const { token, email } = locationQuery
  const containerRef = useRef(null)

  useEffect(() => {
    dispatch(rawAction.confirmEmailRequest({ Token: token, Email: email }))

    return () => {
      dispatch(rawAction.resetConfirmEmail())
    }
  }, [dispatch, email, token])

  return (
    <Container maxWidth='sm'>
      {isLoading && <LinearProgress sx={{ borderRadius: 10 }} />}
      <Paper className={classes.rootPaper} ref={containerRef}>
        <Grid container direction='column' spacing={2}>
          <Grid item className={classes.cardHeader}>
            <Avatar sx={{ m: 1 }} className={isConfirmEmailSucceeded ? classes.avatarBlockSucceeded : classes.avatarBlock}>
              {
                isConfirmEmailSucceeded
                  ? <Done />
                  : <Email />
              }
            </Avatar>
            <Typography component='h1' variant='h5' align='center'>
              Confirm email
            </Typography>
          </Grid>
        </Grid>
        {
          isLoading
            ? (
              <Grid item>
                <Typography align='center'>
                  Account confirmation in progress...
                </Typography>
              </Grid>
            )
            : (
              <>
                <LeftRightSlide in={isConfirmEmailSucceeded} mountOnEnter unmountOnExit container={containerRef.current}>
                  <Grid item>
                    <Typography align='center'>
                      Your email was successfully confirmed.
                    </Typography>
                  </Grid>
                </LeftRightSlide>
                <LeftRightSlide in={!isConfirmEmailSucceeded} mountOnEnter unmountOnExit container={containerRef.current}>
                  <Grid item>
                    <Typography align='center'>
                      For some reason email confirmation was not successful.
                    </Typography>
                  </Grid>
                </LeftRightSlide>
              </>
            )
        }
      </Paper>
    </Container>
  )
}

ConfirmEmail.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ConfirmEmail)
