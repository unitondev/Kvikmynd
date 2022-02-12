import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles';
import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import { NavBar } from '../../../navbar'
import styles from './styles'

const MovieList = ({ classes, movies, searchRequest, handleSearchBarChange }) => (
  <>
    <NavBar />
    <div className={classes.movieListBlock}>
      <TextField
        id='outlined-basic'
        variant='outlined'
        className={classes.searchBar}
        size='small'
        placeholder='Search'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={searchRequest}
        onChange={handleSearchBarChange}
      />
      {
        movies.length > 0
          ? (
              movies.filter((movie) => {
                if (searchRequest === '') return movie
                else if (movie.title.toLowerCase().includes(searchRequest.toLowerCase())) return movie
              })
                .map((movie) => {
                  return (
                    <Card className={classes.movieCardBlock} key={movie.id}>
                      <CardContent className={classes.movieCardContent}>
                        <div className={classes.movieCardHeader}>
                          <Typography className={classes.movieCardTitle}>{movie.title}</Typography>
                        </div>
                        <div className={classes.movieCardMovieContent}>
                          {
                            movie.cover
                              ? (
                                <>
                                  <CardMedia className={classes.movieCardCover} image={movie.cover} />
                                </>
                              )
                              : (
                                <CircularProgress />
                              )}
                          <Typography className={classes.movieCardDescription}>
                            {movie.description}
                          </Typography>
                        </div>
                      </CardContent>
                      <CardActions>
                        <Link to={`/movie${movie.id}`} className={classes.movieLink}>
                          <Button size='small' color='primary'>
                            More details
                          </Button>
                        </Link>
                      </CardActions>
                    </Card>
                  )
                })
          )
          : (
            <CircularProgress className={classes.spinner} />
          )
      }
    </div>
  </>
)

MovieList.propTypes = {
  classes: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
  searchRequest: PropTypes.string.isRequired,
  handleSearchBarChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(MovieList)
