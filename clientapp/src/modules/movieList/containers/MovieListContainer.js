import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add'
import { Button, IconButton, Tooltip, Zoom } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore'
import FileUploadIcon from '@mui/icons-material/FileUpload'

import MovieList from '../components/MovieList'
import * as rawActions from '../actions'
import { getIsMovieListLoading, getMovieList, getMovieListTotalCount } from '../selectors'
import { hasPermission } from '@movie/modules/permissions/selectors'
import { ApplicationPermissions } from '../../../Enums'
import * as movieActions from '@movie/modules/movie/actions'
import { toBase64 } from '@movie/modules/account/helpers'
import ConfirmationDialog from '@movie/shared/dialogs/components/ConfirmationDialog'
import AddEditMovieDialog from '@movie/modules/movieList/components/AddEditMovieDialog'
import { fromFileToText } from '@movie/modules/movieList/helpers'

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
  const uploadInputRef = useRef(null)
  const [jsonFile, setJsonFile] = useState(null)

  useEffect(() => {
    return () => { dispatch(rawActions.resetState()) }
  }, [dispatch])

  useEffect(() => {
    dispatch(rawActions.movieList.request({
      PageNumber: pageNumber ?? 1,
      PageSize,
      ...searchQuery && { SearchQuery: searchQuery },
    }))

    return () => { dispatch(rawActions.movieList.cancel()) }
  }, [dispatch, pageNumber, searchQuery])

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
  const handleClickDeleteMovie = useCallback((movieToDeleteId) => {
    setMovieToDeleteId(movieToDeleteId)
    setOpenDeleteDialog(true)
  }, [])

  const handleCloseDeleteMovie = useCallback(() => {
    setMovieToDeleteId(null)
    setOpenDeleteDialog(false)
  }, [])

  const handleDeleteMovieSubmit = useCallback( () => {
    dispatch(movieActions.deleteMovieRequest({ id: movieToDeleteId }))
    handleCloseDeleteMovie()
  }, [dispatch, handleCloseDeleteMovie, movieToDeleteId])

  const dialogProps = {
    onSubmit: handleDeleteMovieSubmit,
    onClose: handleCloseDeleteMovie,
    open: openDeleteDialog,
    title: 'Delete movie',
    message: 'Are you sure want to delete this movie?',
  }

  const handleExportAllAsJson = useCallback(() => {
    dispatch(rawActions.getAllMoviesForBackup.request())
  }, [dispatch])

  const handleRestoreFromJson = useCallback(async () => {
    const json = await fromFileToText(jsonFile)
    setJsonFile(null)
    dispatch(rawActions.restoreAllMovies.request({ Json: json }))
  }, [dispatch, jsonFile])

  return (
    <>
      <MovieList
        movies={movies}
        pageNumber={pageNumber ? Number(pageNumber) : 1}
        pagesTotalCount={Math.ceil(moviesTotalCount / PageSize)}
        searchQuery={location.query.query}
        isLoading={isLoading}
        isShowEditMovie={hasEditMoviePermission}
        isShowDeleteMovie={hasEditMoviePermission}
        handleOpenAddEditMovieDialog={handleOpenAddEditMovieDialog}
        handleClickDeleteMovie={handleClickDeleteMovie}
        action={
          <>
            { hasAddMoviePermission && (
              <Button variant='outlined' color='primary' onClick={handleOpenAddEditMovieDialog} startIcon={<AddIcon />} sx={{marginX: 1}} >
                Add movie
              </Button>
            )}
            {
              hasAddMoviePermission && (
                <>
                  <Tooltip TransitionComponent={Zoom} title='Export all movies as json'>
                    <IconButton onClick={handleExportAllAsJson}>
                      <FileDownloadIcon />
                    </IconButton>
                  </Tooltip>
                  <input
                    type='file'
                    accept='application/json'
                    onChange={(e) => setJsonFile(e.currentTarget.files[0])}
                    hidden
                    ref={uploadInputRef}
                  />
                  <Tooltip TransitionComponent={Zoom} title='Upload json'>
                    <IconButton onClick={() => uploadInputRef.current && uploadInputRef.current.click()}>
                      <FileUploadIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip TransitionComponent={Zoom} title='Restore movies'>
                    <span>
                      <IconButton onClick={handleRestoreFromJson} disabled={jsonFile === null}>
                        <SettingsBackupRestoreIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                </>
              )
            }
          </>
        }
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
}

export default MovieListContainer
