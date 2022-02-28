import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MovieList from '../components/MovieList'
import * as rawActions from '../actions'
import { getMovieList } from '../selectors'

const MovieListContainer = () => {
  const dispatch = useDispatch()
  const movies = useSelector(getMovieList)

  useEffect(() => {
    dispatch(rawActions.movieListRequest())
  }, [])

  return (
    <MovieList
      movies={movies}
    />
  )
}

export default MovieListContainer
