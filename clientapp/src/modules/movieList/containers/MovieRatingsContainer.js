import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MovieList from '../components/MovieList'
import * as rawActions from '../actions'
import {
  getFavoritesMoviesList,
  getFavoritesMoviesListTotalCount,
  getIsFavoritesMoviesListLoading,
} from '@movie/modules/movieList/selectors'

const MovieRatingsContainer = () => {
  const dispatch = useDispatch()
  const location = useSelector(state => state.router.location)
  const movies = useSelector(getFavoritesMoviesList)
  const moviesTotalCount = useSelector(getFavoritesMoviesListTotalCount)
  const isLoading = useSelector(getIsFavoritesMoviesListLoading)
  const pageNumber = location.query.page
  const PageSize = 5

  useEffect(() => {
    dispatch(rawActions.onGetMyMoviesRatingsList({
      PageNumber: pageNumber ?? 1,
      PageSize,
    }))

    return () => {
      dispatch(rawActions.resetMoviesRatingsList())
    }
  }, [dispatch, pageNumber])

  return (
    <MovieList
      movies={movies}
      pageNumber={pageNumber ? Number(pageNumber) : 1}
      pagesTotalCount={Math.ceil(moviesTotalCount / PageSize)}
      searchQuery={location.query.query}
      isLoading={isLoading}
      isShowAddMovie={false}
      isShowEditMovie={false}
    />
  )
}

export default MovieRatingsContainer
