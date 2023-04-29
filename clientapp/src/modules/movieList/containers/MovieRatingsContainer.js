import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FilterListIcon from '@mui/icons-material/FilterList'
import { IconButton } from '@mui/material'

import MovieList from '../components/MovieList'
import * as rawActions from '../actions'
import {
  getFavoritesMoviesList,
  getFavoritesMoviesListTotalCount,
  getIsFavoritesMoviesListLoading,
} from '@movie/modules/movieList/selectors'

const MovieRatingsContainer = () => {
  const dispatch = useDispatch()
  const location = useSelector((state) => state.router.location)
  const movies = useSelector(getFavoritesMoviesList)
  const moviesTotalCount = useSelector(getFavoritesMoviesListTotalCount)
  const isLoading = useSelector(getIsFavoritesMoviesListLoading)
  const pageNumber = location.query.page
  const PageSize = 5
  const [order, setOrder] = useState('desc')

  useEffect(() => {
    return () => {
      dispatch(rawActions.resetMoviesRatingsList())
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(
      rawActions.onGetMyMoviesRatingsList({
        PageNumber: pageNumber ?? 1,
        PageSize,
        Order: order,
      })
    )
  }, [dispatch, pageNumber, order])

  const changeOrder = useCallback(() => {
    setOrder(order === 'desc' ? 'asc' : 'desc')
  }, [order])

  return (
    <MovieList
      movies={movies}
      pageNumber={pageNumber ? Number(pageNumber) : 1}
      pagesTotalCount={Math.ceil(moviesTotalCount / PageSize)}
      searchQuery={location.query.query}
      isLoading={isLoading}
      isShowEditMovie={false}
      isShowDeleteMovie={false}
      title='My ratings'
      action={
        <IconButton onClick={changeOrder}>
          <FilterListIcon
            sx={{ transform: `${order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)'}` }}
          />
        </IconButton>
      }
    />
  )
}

export default MovieRatingsContainer
