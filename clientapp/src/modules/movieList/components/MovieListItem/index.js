import React from 'react'
import PropTypes from 'prop-types'
import {
  Button, Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Rating,
  Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'

import { calculateMovieRating } from '@movie/modules/movie/helpers'
import routes from '@movie/routes'

const MovieListItem = ({
  movie,
  isShowEditMovie,
  handleOpenAddMovieDialog,
  handleClickDeleteMovie
 }) => {
  return (
    <Grid item>
      <Card>
        <CardHeader
          title={`${movie.title} ${movie.year ? `(${movie.year})` : ''}`}
          action={
            isShowEditMovie && (
              <>
                <IconButton onClick={() => handleOpenAddMovieDialog(movie)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleClickDeleteMovie(movie.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            )
          }
        />
        <CardContent>
          <Grid container direction='row' spacing={2}>
            <Grid item xs={3}>
              <CardMedia
                component='img'
                height='400'
                image={movie.coverUrl}
                alt={movie.title}
              />
            </Grid>
            <Grid item xs={9}>
              <Grid container direction='column'>
                {
                  movie.ratings && (
                    <Grid item>
                      <Rating
                        value={calculateMovieRating(movie.ratings) ?? 0}
                        readOnly
                        max={10}
                        precision={0.5}
                      />
                    </Grid>
                  )
                }
                {
                  movie.rating && (
                    <Grid item>
                      <Rating
                        value={movie.rating.value}
                        readOnly
                        max={10}
                        precision={0.5}
                      />
                      <Typography sx={{ display: 'inline', verticalAlign: 'super' }}> - your rating</Typography>
                    </Grid>
                  )
                }
                {
                  movie.genres?.length > 0 && (
                    <Grid item>
                      <Typography>
                        Genres: {movie.genres.map((g) => ` ${g.name}, `)}
                      </Typography>
                    </Grid>
                  )
                }
                <Grid item>
                  <Typography>
                    {movie.description}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button component={Link} to={routes.movie(movie.id)} size='small' color='primary'>
            More details...
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

MovieListItem.propTypes = {
  movie: PropTypes.object.isRequired,
  isShowEditMovie: PropTypes.bool.isRequired,
  handleOpenAddMovieDialog: PropTypes.func,
  handleClickDeleteMovie: PropTypes.func,
}

export default MovieListItem