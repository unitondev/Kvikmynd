import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import MovieList from '../components/MovieList'
import * as rawActions from '../actions'
import { getIsMovieListLoading, getMovieList, getMovieListTotalCount } from '../selectors'
import { addQueryToUrl } from '@movie/modules/movieList/helpers'
import { hasPermission } from '@movie/modules/permissions/selectors'
import { ApplicationPermissions } from '../../../Enums'

const MovieListContainer = () => {
  const dispatch = useDispatch()
  const movies = useSelector(getMovieList)
  const moviesTotalCount = useSelector(getMovieListTotalCount)
  const isLoading = useSelector(getIsMovieListLoading)
  const location = useSelector(state => state.router.location)
  const [isOpenAddMovie, setIsOpenAddMovie] = useState(false)
  const hasAddMoviePermission = useSelector(state => hasPermission(state, ApplicationPermissions.AddMovie))
  const PageSize = 5
  const pageNumber = location.query.page
  const searchQuery = location.query.query

  useEffect(() => {
    return () => {
      dispatch(rawActions.resetState())
    }
  }, [])

  useEffect(() => {
    dispatch(rawActions.movieListRequest({
      PageNumber: pageNumber ?? 1,
      PageSize,
      ...searchQuery && { SearchQuery: searchQuery },
    }))
  }, [dispatch, pageNumber, searchQuery])

  const generateUrlWithPageQuery = useCallback((page) => {
    return addQueryToUrl('page', page, location.pathName, location.search)
  }, [location])

  const handleOpenAddMovieDialog = useCallback(() => {
    setIsOpenAddMovie(true)
  }, [])

  const handleCloseAddMovieDialog = useCallback(() => {
    setIsOpenAddMovie(false)
  }, [])

  const handleAddMovieSubmit = useCallback((values) => {
    console.log(values)
    handleCloseAddMovieDialog()
  }, [])

  return (
    <MovieList
      movies={movies}
      pageNumber={pageNumber ? Number(pageNumber) : 1}
      generateUrlWithPageQuery={generateUrlWithPageQuery}
      pagesTotalCount={Math.ceil(moviesTotalCount / PageSize)}
      searchQuery={location.query.query}
      isLoading={isLoading}
      isShowAddMovie={hasAddMoviePermission}
      isOpenAddMovie={isOpenAddMovie}
      handleOpenAddMovieDialog={handleOpenAddMovieDialog}
      handleCloseAddMovieDialog={handleCloseAddMovieDialog}
      handleAddMovieSubmit={handleAddMovieSubmit}
    />
  )
}

MovieListContainer.propTypes = {
  searchRoute: PropTypes.bool,
}

export default MovieListContainer
