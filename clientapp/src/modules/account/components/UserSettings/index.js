import React, { useState } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import {
  Avatar,
  Container,
  Fade,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  Paper,
  Typography,
} from '@mui/material'

import styles from './styles'
import { getUserSettingsTabs } from '../../helpers'
import AccountInfo from '../AccountInfo'
import ChangePassword from '../ChangePassword'
import ConfirmationDialog from '@movie/shared/dialogs/components/ConfirmationDialog'
import Subscriptions from '@movie/modules/account/components/Subscriptions'

const UserSettings = ({
  classes,
  user,
  handleUpdateAccount,
  handleChangePassword,
  handleClickDeleteAccount,
  dialogProps,
}) => {
  const [selectedTab, setSelectedTab] = useState(0)

  const handleSelectedTab = (tabId) => {
    setSelectedTab(tabId)
  }

  const tabs = getUserSettingsTabs()

  return (
    <Container maxWidth='md'>
      <Paper className={classes.rootPaper}>
        <Grid container direction='row' spacing={3}>
          <Grid item xs={3}>
            <Grid container direction='column'>
              <Grid item>
                <div className={classes.avatarBlock}>
                  <Avatar src={user.avatarUrl} className={classes.avatarPicture} />
                </div>
              </Grid>
              <Grid item>
                <List>
                  {tabs.map((elem) => (
                    <ListItemButton
                      key={elem.id}
                      selected={selectedTab === elem.id}
                      onClick={(e) => handleSelectedTab(elem.id)}
                    >
                      <ListItemIcon>{elem.icon}</ListItemIcon>
                      <Typography>{elem.label}</Typography>
                    </ListItemButton>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Grid>

          {selectedTab === 0 && (
            <Fade in>
              <Grid item xs={9}>
                <AccountInfo
                  user={user}
                  handleUpdateAccount={handleUpdateAccount}
                  handleDeleteAccount={handleClickDeleteAccount}
                />
              </Grid>
            </Fade>
          )}
          {selectedTab === 1 && (
            <Fade in>
              <Grid item xs={9}>
                <Subscriptions />
              </Grid>
            </Fade>
          )}
          {selectedTab === 2 && (
            <Fade in>
              <Grid item xs={9}>
                <ChangePassword handleChangePassword={handleChangePassword} />
              </Grid>
            </Fade>
          )}
        </Grid>
      </Paper>
      <ConfirmationDialog {...dialogProps} />
    </Container>
  )
}

UserSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleUpdateAccount: PropTypes.func.isRequired,
  handleChangePassword: PropTypes.func.isRequired,
  handleClickDeleteAccount: PropTypes.func.isRequired,
  dialogProps: PropTypes.object.isRequired,
}

export default withStyles(styles)(UserSettings)
