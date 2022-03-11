import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import MovieList from '../components/MovieList'
import * as rawActions from '../actions'
import { getMovieList, getMovieListTotalCount } from '../selectors'

const MovieListContainer = ({
  searchRoute,
}) => {
  const dispatch = useDispatch()
  const movies = useSelector(getMovieList)
  const moviesTotalCount = useSelector(getMovieListTotalCount)
  const locationQuery = useSelector(state => state.router.location.query)
  const [pageNumber, setPageNumber] = useState(1)
  const PageSize = 5

  useEffect(() => {
    return () => {
      dispatch(rawActions.resetState())
    }
  }, [])

  useEffect(() => {
    setPageNumber(1)

    if (pageNumber === 1) {
      dispatch(rawActions.movieListRequest({
        PageNumber: pageNumber,
        PageSize,
        ...locationQuery.query && { SearchQuery: locationQuery.query },
      }))
    }
  }, [searchRoute])

  useEffect(() => {
    dispatch(rawActions.movieListRequest({
      PageNumber: pageNumber,
      PageSize,
      ...locationQuery.query && { SearchQuery: locationQuery.query },
    }))
  }, [dispatch, pageNumber])

  const handleClickPagination = (event, value) => {
    setPageNumber(value)
  }

  return (
    <MovieList
      movies={movies}
      pageNumber={pageNumber}
      handleClickPagination={handleClickPagination}
      pagesTotalCount={Math.ceil(moviesTotalCount / PageSize)}
      isSearchRoute={Boolean(searchRoute)}
      locationQuery={locationQuery}
    />
  )
}

MovieListContainer.propTypes = {
  searchRoute: PropTypes.bool,
}

export default MovieListContainer
