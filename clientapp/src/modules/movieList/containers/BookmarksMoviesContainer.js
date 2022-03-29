import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MovieList from '../components/MovieList'
import * as rawActions from '../actions'
import {
  getBookmarkMoviesList,
  getBookmarkMoviesListLoading,
  getBookmarkMoviesListTotalCount,
} from '@movie/modules/movieList/selectors'

const BookmarksMoviesContainer = () => {
  const dispatch = useDispatch()
  const location = useSelector(state => state.router.location)
  const movies = useSelector(getBookmarkMoviesList)
  const moviesTotalCount = useSelector(getBookmarkMoviesListTotalCount)
  const isLoading = useSelector(getBookmarkMoviesListLoading)
  const pageNumber = location.query.page
  const PageSize = 5

  useEffect(() => {
    dispatch(rawActions.getBookmarksMoviesRequest({
      PageNumber: pageNumber ?? 1,
      PageSize,
    }))
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

export default BookmarksMoviesContainer
