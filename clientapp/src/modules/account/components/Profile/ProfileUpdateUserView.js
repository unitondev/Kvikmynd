import React from 'react'
import withStyles from '@mui/styles/withStyles';
import styles from './styles'
import { Avatar, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { AvatarPreview } from '../../../../helpers'
import NotificationContainer from '../../../../containers/NotificationsContainer'
import PropTypes from 'prop-types'

const Index = ({ classes, onSubmitForm, formik, currentAvatar, handleSelectingFile }) => (
  <div className={classes.profileBlock}>
    <NotificationContainer />
    <div className={classes.profileInfoBlock}>
      <form className={classes.formBlock} onSubmit={onSubmitForm}>
        <div className={classes.avatarProfile}>
          {
            !!formik.values.avatar
              ? (
                <AvatarPreview file={formik.values.avatar} classes={classes.avatarBig} />
              )
              : (
              <Avatar src={currentAvatar} className={classes.avatarBig} />
              )
          }
          <input
            type='file'
            name='avatar'
            accept='image/*'
            onChange={handleSelectingFile}
            className={classes.inputFile}
          />
        </div>
        <div className={classes.profileInfoString}>
          <Card className={classes.cardBlock}>
            <CardContent className={classes.cardContent}>
              <Typography variant='h6' className={classes.profileInfoStringKey}>
                Full Name:
              </Typography>
              <TextField
                error={!!(formik.touched.fullName && formik.errors.fullName)}
                helperText={
                  !!(formik.touched.fullName && formik.errors.fullName) === false
                    ? null
                    : formik.errors.fullName
                }
                label='Full name'
                type='text'
                variant='standard'
                {...formik.getFieldProps('fullName')}
              />
            </CardContent>
          </Card>
        </div>
        <div className={classes.profileInfoString}>
          <Card className={classes.cardBlock}>
            <CardContent className={classes.cardContent}>
              <Typography variant='h6' className={classes.profileInfoStringKey}>
                User Name:
              </Typography>
              <TextField
                error={!!(formik.touched.userName && formik.errors.userName)}
                helperText={
                  !!(formik.touched.userName && formik.errors.userName) === false
                    ? null
                    : formik.errors.userName
                }
                label='User name'
                type='text'
                variant='standard'
                {...formik.getFieldProps('userName')}
              />
            </CardContent>
          </Card>
        </div>
        <div className={classes.profileInfoString}>
          <Card className={classes.cardBlock}>
            <CardContent className={classes.cardContent}>
              <Typography variant='h6' className={classes.profileInfoStringKey}>
                Email:
              </Typography>
              <TextField
                error={!!(formik.touched.email && formik.errors.email)}
                helperText={
                  !!(formik.touched.email && formik.errors.email) === false
                    ? null
                    : formik.errors.email
                }
                label='Email'
                type='text'
                variant='standard'
                {...formik.getFieldProps('email')}
              />
            </CardContent>
          </Card>
        </div>
        <div className={classes.profileInfoString}>
          <Card className={classes.cardBlock}>
            <CardContent className={classes.cardContent}>
              <Typography variant='h6' className={classes.profileInfoStringKey}>
                Old password:
              </Typography>
              <TextField
                error={!!(formik.touched.oldPassword && formik.errors.oldPassword)}
                helperText={
                  !!(formik.touched.oldPassword && formik.errors.oldPassword) === false
                    ? null
                    : formik.errors.oldPassword
                }
                label='Old password'
                type='password'
                variant='standard'
                {...formik.getFieldProps('oldPassword')}
              />
            </CardContent>
          </Card>
        </div>
        <div className={classes.profileInfoString}>
          <Card className={classes.cardBlock}>
            <CardContent className={classes.cardContent}>
              <Typography variant='h6' className={classes.profileInfoStringKey}>
                New password:
              </Typography>
              <TextField
                error={!!(formik.touched.newPassword && formik.errors.newPassword)}
                helperText={
                  !!(formik.touched.newPassword && formik.errors.newPassword) === false
                    ? null
                    : formik.errors.newPassword
                }
                label='New password'
                type='password'
                variant='standard'
                {...formik.getFieldProps('newPassword')}
              />
            </CardContent>
          </Card>
        </div>
        <div className={classes.buttonBlock}>
          <Button variant='contained' className={classes.updateButton} type='submit'>
            Update information
          </Button>
        </div>
      </form>
    </div>
  </div>
)

Index.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  formik: PropTypes.object.isRequired,
  currentAvatar: PropTypes.string.isRequired,
  handleSelectingFile: PropTypes.func.isRequired,
}

export default withStyles(styles)(Index)
