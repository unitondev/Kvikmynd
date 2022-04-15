import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

import MovieList from '../components/MovieList'
import * as rawActions from '../actions'
import {
  getBookmarkMoviesList,
  getBookmarkMoviesListLoading,
  getBookmarkMoviesListTotalCount,
} from '@movie/modules/movieList/selectors'
import { exportAsXlsxFile } from '@movie/shared/utils/excelFileHandler'

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

  const exportAsExcelFile = useCallback(() => {
    const data = movies.map(e => {
      delete e.coverUrl
      delete e.description
      delete e.youtubeLink
      delete e.genres
      delete e.ratings
      delete e.isBookmark
      return e
    })
    exportAsXlsxFile(data, 'Bookmarks')
  }, [movies])

  return (
    <MovieList
      movies={movies}
      pageNumber={pageNumber ? Number(pageNumber) : 1}
      pagesTotalCount={Math.ceil(moviesTotalCount / PageSize)}
      searchQuery={location.query.query}
      isLoading={isLoading}
      isShowEditMovie={false}
      isShowDeleteMovie={false}
      title='Bookmarks'
      action={
        <Button
          variant='outlined'
          color='primary'
          onClick={exportAsExcelFile}
          startIcon={<FileDownloadIcon />}
          disabled={!movies.length > 0}
        >
          Export to excel
        </Button>
      }
    />
  )
}

export default BookmarksMoviesContainer
