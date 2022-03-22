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
import ConfirmationDialog from '@movie/shared/dialogs/components/ConfirmationDialog'
import AddEditMovieDialog from '@movie/modules/movieList/components/AddEditMovieDialog'

const MovieListContainer = () => {
  const dispatch = useDispatch()
  const [movieToDeleteId, setMovieToDeleteId] = useState(null)
  const [movieToUpdate, setMovieToUpdate] = useState(null)
  const [isOpenAddMovie, setIsOpenAddMovie] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const movies = useSelector(getMovieList)
  const moviesTotalCount = useSelector(getMovieListTotalCount)
  const isLoading = useSelector(getIsMovieListLoading)
  const location = useSelector(state => state.router.location)
  const hasAddMoviePermission = useSelector(state => hasPermission(state, ApplicationPermissions.AddMovie))
  const hasEditMoviePermission = useSelector(state => hasPermission(state, ApplicationPermissions.EditMovie))
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

  // add edit movie
  const handleOpenAddEditMovieDialog = useCallback((movieToUpdate) => {
    movieToUpdate.id && setMovieToUpdate(movieToUpdate)
    setIsOpenAddMovie(true)
  }, [])

  const handleCloseAddEditMovieDialog = useCallback(() => {
    setMovieToUpdate(null)
    setIsOpenAddMovie(false)
  }, [])

  const handleAddEditMovieSubmit = useCallback(async (values) => {
    if (values.cover && typeof values.cover === 'object') values.cover = await toBase64(values.cover)
    values.id
      ? dispatch(movieActions.updateMovieRequest(values))
      : dispatch(movieActions.createMovieRequest(values))

    handleCloseAddEditMovieDialog()
  }, [dispatch, handleCloseAddEditMovieDialog])

  // remove movie
  const handleClickDeleteMovie = (movieToDeleteId) => {
    setMovieToDeleteId(movieToDeleteId)
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
    <>
      <MovieList
        movies={movies}
        pageNumber={pageNumber ? Number(pageNumber) : 1}
        generateUrlWithPageQuery={generateUrlWithPageQuery}
        pagesTotalCount={Math.ceil(moviesTotalCount / PageSize)}
        searchQuery={location.query.query}
        isLoading={isLoading}
        isShowAddMovie={hasAddMoviePermission}
        isShowEditMovie={hasEditMoviePermission}
        handleOpenAddMovieDialog={handleOpenAddEditMovieDialog}
        handleClickDeleteMovie={handleClickDeleteMovie}
      />
      <AddEditMovieDialog
        isOpen={isOpenAddMovie}
        onClose={handleCloseAddEditMovieDialog}
        onSubmit={handleAddEditMovieSubmit}
        movieToUpdate={movieToUpdate}
      />
      <ConfirmationDialog {...dialogProps} />
    </>
  )
}

MovieListContainer.propTypes = {
  searchRoute: PropTypes.bool,
}

export default MovieListContainer
