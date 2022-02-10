import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { LoginContainer } from './containers/LoginContainer'
import { RegisterContainer } from './containers/RegisterContainer'
import PrivateRoute from './PrivateRoute'
import { ProfileContainer } from './containers/ProfileContainer'
import { getUser } from './selectors/selectors'
import { refreshTokensRequest } from './actions'
import { HomePageContainer } from './containers/HomePageContainer'
import { SelectedMovieContainer } from './containers/SelectedMovieContainer'

export const AppRouter = () => {
  const user = useSelector(getUser)
  const dispatch = useDispatch()
  useEffect(() => {
    if (user === null) dispatch(refreshTokensRequest())
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <HomePageContainer />
        </Route>
        <Route path='/login'>
          <LoginContainer />
        </Route>
        <Route path='/register'>
          <RegisterContainer />
        </Route>
        <PrivateRoute path='/profile' component={() => <ProfileContainer />} />
        <PrivateRoute path='/movie:id' component={() => <SelectedMovieContainer />} />
      </Switch>
    </Router>
  )
}
