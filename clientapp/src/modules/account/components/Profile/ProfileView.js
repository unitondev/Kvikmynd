import React from 'react'
import withStyles from '@mui/styles/withStyles';
import styles from './styles'
import { Avatar, Card, CardContent, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const ProfileView = ({ classes, user }) => (
  <div className={classes.profileBlock}>
    <div className={classes.profileInfoBlock}>
      <div className={classes.avatarProfile}>
        <Avatar src={user.avatar} className={classes.avatarBig} />
      </div>
      <div className={classes.profileInfoString}>
        <Card className={classes.cardBlock}>
          <CardContent className={classes.cardContent}>
            <Typography variant='h6' className={classes.profileInfoStringKey}>
              Full Name:
            </Typography>
            <Typography>{user.fullName}</Typography>
          </CardContent>
        </Card>
      </div>
      <div className={classes.profileInfoString}>
        <Card className={classes.cardBlock}>
          <CardContent className={classes.cardContent}>
            <Typography variant='h6' className={classes.profileInfoStringKey}>
              User Name:
            </Typography>
            <Typography>{user.userName}</Typography>
          </CardContent>
        </Card>
      </div>
      <div className={classes.profileInfoString}>
        <Card className={classes.cardBlock}>
          <CardContent className={classes.cardContent}>
            <Typography variant='h6' className={classes.profileInfoStringKey}>
              Email:
            </Typography>
            <Typography>{user.email}</Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
)

ProfileView.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProfileView)
