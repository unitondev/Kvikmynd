import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MovieList from '../components/MovieList'
import * as rawActions from '../actions'
import { getMovieList } from '../selectors'

const MovieListContainer = () => {
  const dispatch = useDispatch()
  const movies = useSelector(getMovieList)
  const [searchRequest, setSearchRequest] = useState('')

  useEffect(() => {
    dispatch(rawActions.movieListRequest())
  }, [])

  const handleSearchBarChange = (event) => {
    setSearchRequest(event.target.value)
  }

  return (
    <MovieList
      movies={movies}
      searchRequest={searchRequest}
      handleSearchBarChange={handleSearchBarChange}
    />
  )
}

export default MovieListContainer
