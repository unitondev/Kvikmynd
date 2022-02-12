import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles';
import { Link } from 'react-router-dom'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { List, ListItem, ListItemText } from '@mui/material'

import ProfileView from './ProfileView'
import ProfileUpdateUserView from './ProfileUpdateUserView'
import ProfileDeleteView from './ProfileDeleteView'
import { Notifications } from '../../../shared/snackBarNotification'
import { NavBar } from '../../../navbar'
import styles from './styles'

const ProfileRouter = ({
  classes,
  onSubmitForm,
  formik,
  user,
  toBase64,
  currentAvatar,
  handleSelectingFile,
  deleteAccount,
}) => {
  const { path, url } = useRouteMatch()
  const [selectedIndex, setSelectedIndex] = React.useState(1)
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }

  return (
    <div>
      <Notifications />
      <NavBar />
      <div className={classes.mainBlock}>
        <List
          component='nav'
          className={`${classes.root} ${classes.profileSectionsBlock}`}
          aria-label='mailbox folders'
        >
          <Link to={`${url}`} className={classes.navigationLink}>
            <ListItem
              button
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemText className={classes.listItemText} primary='User data' />
            </ListItem>
          </Link>
          <Link to={`${url}/update_user_react`} className={classes.navigationLink}>
            <ListItem
              button
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemText className={classes.listItemText} primary='Edit user date' />
            </ListItem>
          </Link>
          <Link to={`${url}/delete_user_react`} className={classes.navigationLink}>
            <ListItem
              button
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemText className={classes.listItemText} primary='Delete account' />
            </ListItem>
          </Link>
        </List>
        <Switch>
          <Route exact path={`${path}`}>
            <ProfileView user={user} />
          </Route>
          <Route exact path={`${path}/update_user_react`}>
            <ProfileUpdateUserView
              onSubmitForm={onSubmitForm}
              formik={formik}
              toBase64={toBase64}
              currentAvatar={currentAvatar}
              handleSelectingFile={handleSelectingFile}
            />
          </Route>
          <Route path={`${path}/delete_user_react`}>
            <ProfileDeleteView deleteAccount={deleteAccount} />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

ProfileRouter.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  formik: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  toBase64: PropTypes.func.isRequired,
  currentAvatar: PropTypes.string.isRequired,
  handleSelectingFile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
}

export default withStyles(styles)(ProfileRouter)
