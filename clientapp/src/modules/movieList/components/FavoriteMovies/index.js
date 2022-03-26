import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import _ from 'lodash'
import { Grid } from '@mui/material'

import * as rawActions from '../../actions'
import {
  getFavoritesMoviesList, getFavoritesMoviesListTotalCount, getIsFavoritesMoviesListLoading,
} from '@movie/modules/movieList/selectors'
import ScrollTopFab from '@movie/modules/navbar/components/ScrollTopFab'
import Pagination from '@movie/modules/movieList/components/Pagination'
import MovieListItem from '@movie/modules/movieList/components/MovieListItem'
import SkeletonMovieListItem from '@movie/modules/movieList/components/SkeletonMovieListItem'

const FavoriteMovies = () => {
  const dispatch = useDispatch()
  const location = useSelector(state => state.router.location)
  const movies = useSelector(getFavoritesMoviesList)
  const moviesTotalCount = useSelector(getFavoritesMoviesListTotalCount)
  const isLoading = useSelector(getIsFavoritesMoviesListLoading)

  const pageNumber = location.query.page
  const PageSize = 5

  useEffect(() => {
    dispatch(rawActions.onGetFavoritesMoviesList({ PageNumber: pageNumber ?? 1, PageSize}))

    return () => {
      dispatch(rawActions.resetFavoritesMovies())
    }
  }, [])

  return (
    <>
      <Grid container direction='column' spacing={5}>
        {
          isLoading
            ? _.times(5, i => <SkeletonMovieListItem key={i} />)
            : (
              <>
                {
                  movies.length > 0 && movies.map((movie) => (
                    <MovieListItem
                      key={movie.id}
                      movie={movie}
                      isShowEditMovie={false}
                    />
                  ))
                }
                {
                  movies.length > 0 && (
                    <Pagination
                      pageNumber={pageNumber ? Number(pageNumber) : 1}
                      pagesTotalCount={Math.ceil(moviesTotalCount / PageSize)}
                    />
                  )
                }
              </>
            )
        }
      </Grid>
      <ScrollTopFab />
    </>
  )
}

export default FavoriteMovies