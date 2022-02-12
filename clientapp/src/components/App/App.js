import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrivateRoute from '../../PrivateRoute'
import { refreshTokensRequest } from '../../modules/account/actions'
import { LoginPage, ProfilePage, RegisterPage } from '../../modules/account'
import { getUser } from '../../modules/account/selectors'
import { MovieListPage } from '../../modules/movieList'
import { MoviePage } from '../../modules/movie'

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
}

export default App
