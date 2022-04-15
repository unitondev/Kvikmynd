import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MovieList from '../components/MovieList'
import * as rawActions from '../actions'
import {
  getArchivedMoviesList, getArchivedMoviesListLoading, getArchivedMoviesListTotalCount,
} from '@movie/modules/movieList/selectors'
import { deleteMoviePermanently, restoreMovie } from '@movie/modules/movie/actions'
import ConfirmationDialog from '@movie/shared/dialogs/components/ConfirmationDialog'
import { hasPermission } from '@movie/modules/permissions/selectors'
import { ApplicationPermissions } from '../../../Enums'

const ArchivedMoviesContainer = () => {
  const dispatch = useDispatch()
  const location = useSelector(state => state.router.location)
  const movies = useSelector(getArchivedMoviesList)
  const moviesTotalCount = useSelector(getArchivedMoviesListTotalCount)
  const isLoading = useSelector(getArchivedMoviesListLoading)
  const pageNumber = location.query.page
  const PageSize = 5
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [movieToDeleteId, setMovieToDeleteId] = useState(null)
  const hasEditMoviePermission = useSelector(state => hasPermission(state, ApplicationPermissions.EditMovie))

  useEffect(() => {
    dispatch(rawActions.getArchivedMovieBySearch.request({
      PageNumber: pageNumber ?? 1,
      PageSize,
    }))

    return () => { dispatch(rawActions.getArchivedMovieBySearch.cancel()) }
  }, [dispatch, pageNumber])

  const handleClickDeleteMovie = useCallback((movieToDeleteId) => {
    setMovieToDeleteId(movieToDeleteId)
    setOpenDeleteDialog(true)
  }, [])

  const handleCloseDeleteMovie = useCallback(() => {
    setMovieToDeleteId(null)
    setOpenDeleteDialog(false)
  }, [])
  
  const handleDeleteMoviePermanentlySubmit = useCallback(() => {
    dispatch(deleteMoviePermanently.request({ id: movieToDeleteId}))
    handleCloseDeleteMovie()
  }, [dispatch, handleCloseDeleteMovie, movieToDeleteId])

  const dialogProps = {
    onSubmit: handleDeleteMoviePermanentlySubmit,
    onClose: handleCloseDeleteMovie,
    open: openDeleteDialog,
    title: 'Delete movie permanently',
    message: 'Are you sure want to delete this movie permanently?',
  }

  const handleClickRestoreMovie = useCallback((movieToRestoreId) => {
    dispatch(restoreMovie.request({ id: movieToRestoreId}))
  }, [dispatch])

  return (
    <>
      <MovieList
        movies={movies}
        pageNumber={pageNumber ? Number(pageNumber) : 1}
        pagesTotalCount={Math.ceil(moviesTotalCount / PageSize)}
        isLoading={isLoading}
        isShowEditMovie={false}
        isShowDeleteMovie={hasEditMoviePermission}
        title='Archive'
        handleClickDeleteMovie={handleClickDeleteMovie}
        handleClickRestoreMovie={handleClickRestoreMovie}
      />
      <ConfirmationDialog {...dialogProps} />
    </>
  )
}

export default ArchivedMoviesContainer
