import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import {
  Box,
  Grid,
  Typography,
} from '@mui/material'
import _ from 'lodash'

import styles from './styles'
import ScrollTopFab from '@movie/modules/navbar/components/ScrollTopFab'
import MovieListItem from '@movie/modules/movieList/components/MovieListItem'
import SkeletonMovieListItem from '@movie/modules/movieList/components/SkeletonMovieListItem'
import Pagination from '@movie/modules/movieList/components/Pagination'
import { conditionalPropType } from '@movie/shared/helpers'

const MovieList = ({
  classes,
  movies,
  pageNumber,
  pagesTotalCount,
  searchQuery,
  isLoading,
  isShowEditMovie,
  handleOpenAddEditMovieDialog,
  handleClickDeleteMovie,
  title,
  action,
}) => (
  <>
    <Grid container direction='column' spacing={5}>
      {
        (title?.length > 0 || action || searchQuery?.length > 0) && (
          <Grid item container alignItems='center'>
            <Box sx={{flex: '1 1 auto'}}>
              { title?.length > 0 && <Typography variant='h5'>{title}</Typography> }
              { searchQuery?.length > 0 && <Typography>Search: {searchQuery}</Typography> }
            </Box>
            <Box>
              {action}
            </Box>
          </Grid>
        )
      }
      {
        isLoading
          ? _.times(5, i => <SkeletonMovieListItem key={i} />)
          : (
            <>
              {
                movies.length > 0 && movies.map((movie) => (
                  <MovieListItem
                    key={movie.id}
                    movie={movie}
                    isShowEditMovie={isShowEditMovie}
                    handleOpenAddEditMovieDialog={handleOpenAddEditMovieDialog}
                    handleClickDeleteMovie={handleClickDeleteMovie}
                  />
                  )
                )
              }
              {
                movies.length > 0 && (
                  <Pagination
                    pageNumber={pageNumber}
                    pagesTotalCount={pagesTotalCount}
                  />
                )
              }
            </>
          )
      }
    </Grid>
    <ScrollTopFab />
  </>
)

MovieList.propTypes = {
  classes: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
  pageNumber: PropTypes.number.isRequired,
  pagesTotalCount: PropTypes.number.isRequired,
  searchQuery: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  isShowEditMovie: PropTypes.bool.isRequired,
  handleClickDeleteMovie: conditionalPropType((props, propName) =>
    (props['isShowEditMovie'] === true && typeof(props[propName]) !== 'function')),
  handleOpenAddEditMovieDialog: conditionalPropType((props, propName) =>
    ((props['isShowEditMovie'] === true) && typeof(props[propName]) !== 'function')),
  title: PropTypes.string,
  action: PropTypes.node,
}

export default withStyles(styles)(MovieList)
