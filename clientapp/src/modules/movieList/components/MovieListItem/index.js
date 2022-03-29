import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
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
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'

import { calculateMovieRating } from '@movie/modules/movie/helpers'
import routes from '@movie/routes'
import { getUserId } from '@movie/modules/account/selectors'
import * as rawActions from '@movie/modules/movieList/actions'
import { conditionalPropType } from '@movie/shared/helpers'

const MovieListItem = ({
  movie,
  isShowEditMovie,
  handleOpenAddEditMovieDialog,
  handleClickDeleteMovie,
}) => {
  const dispatch = useDispatch()
  const userId = useSelector(getUserId)

  const handleChangeBookmark = (movie) => {
    const data = {
      UserId: userId,
      MovieId: movie.id,
    }

    movie.isBookmark
      ? dispatch(rawActions.deleteMovieBookmarkRequest(data))
      : dispatch(rawActions.addMovieToBookmarkRequest(data))
  }

  return (
    <Grid item>
      <Card>
        <CardHeader
          title={`${movie.title} ${movie.year ? `(${movie.year})` : ''}`}
          action={
            <>
              {
                userId && (
                  <IconButton onClick={() => handleChangeBookmark(movie)}>
                    {movie.isBookmark ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  </IconButton>
                )
              }
              {
                isShowEditMovie && (
                  <>
                    <IconButton onClick={() => handleOpenAddEditMovieDialog(movie)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleClickDeleteMovie(movie.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )
              }
            </>
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
  handleOpenAddEditMovieDialog: conditionalPropType((props, propName) =>
    (props['isShowEditMovie'] === true && typeof(props[propName]) !== 'function')),
  handleClickDeleteMovie: conditionalPropType((props, propName) =>
    (props['isShowEditMovie'] === true && typeof(props[propName]) !== 'function')),
}

export default MovieListItem
