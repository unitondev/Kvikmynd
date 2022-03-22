import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import MovieList from '../components/MovieList'
import * as rawActions from '../actions'
import { getIsMovieListLoading, getMovieList, getMovieListTotalCount } from '../selectors'
import { addQueryToUrl } from '@movie/modules/movieList/helpers'
import { hasPermission } from '@movie/modules/permissions/selectors'
import { ApplicationPermissions } from '../../../Enums'
import * as movieActions from '@movie/modules/movie/actions'
import { toBase64 } from '@movie/modules/account/helpers'

const MovieListContainer = () => {
  const dispatch = useDispatch()
  const movies = useSelector(getMovieList)
  const moviesTotalCount = useSelector(getMovieListTotalCount)
  const isLoading = useSelector(getIsMovieListLoading)
  const location = useSelector(state => state.router.location)
  const [isOpenAddMovie, setIsOpenAddMovie] = useState(false)
  const hasAddMoviePermission = useSelector(state => hasPermission(state, ApplicationPermissions.AddMovie))
  const hasEditMoviePermission = useSelector(state => hasPermission(state, ApplicationPermissions.EditMovie))
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [movieToDeleteId, setMovieToDeleteId] = useState(null)
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

  // add movie
  const handleAddMovieSubmit = useCallback(async (values) => {
    if (values.cover) values.cover = await toBase64(values.cover)
    dispatch(movieActions.createMovieRequest(values))
    handleCloseAddMovieDialog()
  }, [dispatch, handleCloseAddMovieDialog])

  // remove movie
  const handleClickDeleteMovie = (id) => {
    setMovieToDeleteId(id)
    setOpenDeleteDialog(true)
  }
  const handleCloseDeleteMovie = () => {
    setMovieToDeleteId(null)
    setOpenDeleteDialog(false)
  }

  const handleDeleteMovieSubmit = useCallback( () => {
    dispatch(movieActions.deleteMovieRequest({ id: movieToDeleteId }))
    handleCloseDeleteMovie()
  }, [dispatch, movieToDeleteId])

  const dialogProps = {
    onSubmit: handleDeleteMovieSubmit,
    onClose: handleCloseDeleteMovie,
    open: openDeleteDialog,
    title: 'Delete movie',
    message: 'Are you sure want to delete this movie?',
  }

  return (
    <MovieList
      movies={movies}
      pageNumber={pageNumber ? Number(pageNumber) : 1}
      generateUrlWithPageQuery={generateUrlWithPageQuery}
      pagesTotalCount={Math.ceil(moviesTotalCount / PageSize)}
      searchQuery={location.query.query}
      isLoading={isLoading}
      isShowAddMovie={hasAddMoviePermission}
      isShowEditMovie={hasEditMoviePermission}
      isOpenAddMovie={isOpenAddMovie}
      handleOpenAddMovieDialog={handleOpenAddMovieDialog}
      handleCloseAddMovieDialog={handleCloseAddMovieDialog}
      handleAddMovieSubmit={handleAddMovieSubmit}
      handleClickDeleteMovie={handleClickDeleteMovie}
      dialogProps={dialogProps}
    />
  )
}

MovieListContainer.propTypes = {
  searchRoute: PropTypes.bool,
}

export default MovieListContainer
