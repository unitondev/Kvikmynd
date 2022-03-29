import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import {
  Button,
  Grid,
  Typography,
} from '@mui/material'
import _ from 'lodash'
import AddIcon from '@mui/icons-material/Add'

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
  isShowAddMovie,
  isShowEditMovie,
  handleOpenAddEditMovieDialog,
  handleClickDeleteMovie,
}) => (
  <>
    <Grid container direction='column' spacing={5}>
      {isShowAddMovie && (
        <Grid item sx={{alignSelf: 'end'}}>
          <Button variant='outlined' color='primary' onClick={handleOpenAddEditMovieDialog} startIcon={<AddIcon />}>
            Add movie
          </Button>
        </Grid>
      )}
      {searchQuery?.length > 0 && (
        <Grid item>
          <Typography>Search: {searchQuery}</Typography>
        </Grid>
      )}
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
  isShowAddMovie: PropTypes.bool.isRequired,
  isShowEditMovie: PropTypes.bool.isRequired,
  handleClickDeleteMovie: conditionalPropType((props, propName) =>
    (props['isShowEditMovie'] === true && typeof(props[propName]) !== 'function')),
  handleOpenAddEditMovieDialog: conditionalPropType((props, propName) =>
    ((props['isShowEditMovie'] === true || props['isShowAddMovie'] === true) && typeof(props[propName]) !== 'function')),
}

export default withStyles(styles)(MovieList)
