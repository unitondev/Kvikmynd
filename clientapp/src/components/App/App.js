import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrivateRoute from '../../PrivateRoute'
import { LoginPage, ProfilePage, RegisterPage } from '../../modules/account'
import { MovieListPage } from '../../modules/movieList'
import { MoviePage } from '../../modules/movie'
import { NavBar } from '../../modules/navbar'
import { Notifications } from '../../modules/shared/snackBarNotification'
import routes from '../../Routes'

const App = () => (
  <>
    <Notifications />
    <Router>
      <NavBar />
      <Switch>
        <Route exact path={routes.root}>
          <MovieListPage />
        </Route>
        <Route path={routes.login}>
          <LoginPage />
        </Route>
        <Route path={routes.register}>
          <RegisterPage />
        </Route>
        <PrivateRoute path={routes.profile} component={() => <ProfilePage />} />
        <PrivateRoute path={routes.movieWithId} component={() => <MoviePage />} />
      </Switch>
    </Router>
  </>
)

export default App
