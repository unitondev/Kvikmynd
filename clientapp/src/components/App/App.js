import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Container } from '@mui/material'

import PrivateRoute from '../../PrivateRoute'
import { LoginPage, ProfilePage, RegisterPage } from '@movie/modules/account'
import { MovieListPage } from '@movie/modules/movieList'
import { MoviePage } from '@movie/modules/movie'
import { NavBar } from '@movie/modules/navbar'
import { Notifications } from '@movie/modules/shared/snackBarNotification'
import Footer from '@movie/modules/shared/footers/components/StickyFooter'
import routes, { archived } from '@movie/routes'
import NotFoundPage from '@movie/shared/components/NotFound'
import ScrollToTop from '@movie/services/ScrollToTop'
import ResetPasswordPage from '@movie/modules/account/components/ResetPassword'
import ConfirmEmailPage from '@movie/modules/account/components/ConfirmEmail'
import BookmarksMoviesContainer from '@movie/modules/movieList/containers/BookmarksMoviesContainer'
import MovieRatingsContainer from '@movie/modules/movieList/containers/MovieRatingsContainer'
import ArchivedMoviesContainer from '@movie/modules/movieList/containers/ArchivedMoviesContainer'

const hideNavbarOn = []
const hideFooterOn = [
  routes.login,
  routes.register,
]

const App = ({ location }) => {
  const hideNavbar = hideNavbarOn.some(i => location.pathname.startsWith(i))
  const hideFooter = hideFooterOn.some(i => location.pathname.startsWith(i))

  return (
    <>
      <ScrollToTop />
      <Footer hideFooter={hideFooter}>
        <Notifications />
        { !hideNavbar && <NavBar /> }
        <Container maxWidth='lg' sx={{ marginTop: '64px' }}>
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
            <PrivateRoute path={routes.profile} component={ProfilePage} />
            <Route path={routes.movieWithId}>
              <MoviePage />
            </Route>
            <Route path={routes.search}>
              <MovieListPage />
            </Route>
            <Route path={routes.forgotPassword}>
              <LoginPage />
            </Route>
            <Route path={routes.resetPassword}>
              <ResetPasswordPage />
            </Route>
            <Route path={routes.confirmEmail}>
              <ConfirmEmailPage />
            </Route>
            <PrivateRoute path={routes.myRatings} component={MovieRatingsContainer} />
            <PrivateRoute path={routes.bookmarks} component={BookmarksMoviesContainer} />
            <PrivateRoute path={routes.archived} component={ArchivedMoviesContainer} />
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </Container>
      </Footer>
    </>
  )
}

export default withRouter(App)
