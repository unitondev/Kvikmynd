import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrivateRoute from '../../PrivateRoute'
import { HomePageContainer } from '../../containers/HomePageContainer'
import { SelectedMovieContainer } from '../../containers/SelectedMovieContainer'
import { refreshTokensRequest } from '../../modules/account/actions'
import { LoginPage, ProfilePage, RegisterPage } from '../../modules/account'
import { getUser } from '../../modules/account/selectors'

const App = () => {
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
          <LoginPage />
        </Route>
        <Route path='/register'>
          <RegisterPage />
        </Route>
        <PrivateRoute path='/profile' component={() => <ProfilePage />} />
        <PrivateRoute path='/movie:id' component={() => <SelectedMovieContainer />} />
      </Switch>
    </Router>
  )
}

export default App
