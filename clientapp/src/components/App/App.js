import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container } from '@mui/material'

import PrivateRoute from '../../PrivateRoute'
import { LoginPage, ProfilePage, RegisterPage } from '@movie/modules/account'
import { MovieListPage } from '@movie/modules/movieList'
import { MoviePage } from '@movie/modules/movie'
import { NavBar } from '@movie/modules/navbar'
import { Notifications } from '@movie/modules/shared/snackBarNotification'
import routes from '@movie/routes'

const App = () => (
  <>
    <Notifications />
    <NavBar />
    <Container maxWidth='lg'>
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
    </Container>
  </>
)

export default App
