import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MovieList from '../components/MovieList'
import * as rawActions from '../actions'
import { getMovieList, getMovieListTotalCount } from '../selectors'

const MovieListContainer = () => {
  const dispatch = useDispatch()
  const movies = useSelector(getMovieList)
  const moviesTotalCount = useSelector(getMovieListTotalCount)
  const [pageNumber, setPageNumber] = useState(1)
  const PageSize = 5

  useEffect(() => {
    return () => {
      dispatch(rawActions.resetState())
    }
  }, [])

  useEffect(() => {
    dispatch(rawActions.movieListRequest({ PageNumber: pageNumber, PageSize }))
  }, [pageNumber])

  const handleClickPagination = (event, value) => {
    setPageNumber(value)
  }

  return (
    <MovieList
      movies={movies}
      pageNumber={pageNumber}
      handleClickPagination={handleClickPagination}
      pagesTotalCount={Math.ceil(moviesTotalCount / PageSize)}
    />
  )
}

export default MovieListContainer
