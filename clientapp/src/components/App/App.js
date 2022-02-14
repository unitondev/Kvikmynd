import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrivateRoute from '../../PrivateRoute'
import { LoginPage, ProfilePage, RegisterPage } from '../../modules/account'
import { MovieListPage } from '../../modules/movieList'
import { MoviePage } from '../../modules/movie'

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/'>
        <MovieListPage />
      </Route>
      <Route path='/login'>
        <LoginPage />
      </Route>
      <Route path='/register'>
        <RegisterPage />
      </Route>
      <PrivateRoute path='/profile' component={() => <ProfilePage />} />
      <PrivateRoute path='/movie:id' component={() => <MoviePage />} />
    </Switch>
  </Router>
)

export default App
