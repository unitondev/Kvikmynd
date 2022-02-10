import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import HomePageView from '../components/HomePage'
import { movieListRequest } from '../actions'
import { getMovieList } from '../selectors/selectors'

export const HomePageContainer = () => {
  const dispatch = useDispatch()
  const movies = useSelector(getMovieList)
  useEffect(() => {
    dispatch(movieListRequest())
  }, [])
  const [searchRequest, setSearchRequest] = useState('')
  const handleSearchBarChange = (event) => {
    setSearchRequest(event.target.value)
  }

  return (
    <HomePageView
      movies={movies}
      searchRequest={searchRequest}
      handleSearchBarChange={handleSearchBarChange}
    />
  )
}
