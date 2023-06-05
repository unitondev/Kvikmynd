import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import YouTube from 'react-youtube'
import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  Box,
  Paper,
  Grid,
  CardActions,
} from '@mui/material'

import ScrollTopFab from '@movie/modules/navbar/components/ScrollTopFab'
import routes from '@movie/routes'
import CommentsList from '../CommentList'
import styles from './styles'
import SimilarMovies from '@movie/modules/movie/components/SimilarMovies'

const Movie = ({
  classes,
  movie,
  movieRating,
  comments,
  currentUserAvatar,
  ratings,
  genres,
  youtubeOpts,
  settedRating,
  onRatingChange,
  handleRatingSet,
  handleCommentSet,
  currentUser,
  handleDeleteCommentClick,
  ratingHover,
  setRatingHover,
  dialogProps,
  hasActiveSubscription,
  similarMovies,
}) => (
  <Paper className={classes.rootPaper}>
    <Grid container direction='column' spacing={4}>
      <Grid item>
        <Card>
          <CardContent>
            <Grid container direction='column' spacing={2}>
              <Grid item>
                <Typography variant='h2' align='center'>
                  {movie.title} {movie.year && `(${movie.year})`}
                </Typography>
              </Grid>
              <Grid item container direction='row' spacing={2}>
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
                    <Grid item>
                      <Typography>
                        Rating:
                        {movieRating === 0
                          ? 'No one has rated yet'
                          : `${movieRating.toFixed(2)} / 10 (${ratings.length})`}
                      </Typography>
                    </Grid>
                    {currentUser.id && (
                      <Grid item container direction='row'>
                        <Grid item xs={1.2}>
                          <Typography>My rating:</Typography>
                        </Grid>
                        <Grid item xs={3.5}>
                          <Rating
                            max={10}
                            value={settedRating ?? 0}
                            onChange={onRatingChange}
                            onChangeActive={(event, newHover) => {
                              setRatingHover(newHover)
                            }}
                          />
                        </Grid>
                        {settedRating !== null && (
                          <Grid item xs={0.5}>
                            <Box className={classes.ratingBox}>
                              <Typography align='center'>
                                {ratingHover !== -1 ? ratingHover : settedRating}
                              </Typography>
                            </Box>
                          </Grid>
                        )}
                        <Grid item xs={1}>
                          <Button size='small' color='primary' onClick={handleRatingSet}>
                            Rate
                          </Button>
                        </Grid>
                      </Grid>
                    )}
                    <Grid item>
                      <Typography>
                        Genres:{' '}
                        {genres?.length > 0 ? genres.map((genre) => ` ${genre.name}, `) : null}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{movie.description}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item container direction='column' spacing={3}>
        <Grid item>
          <Typography variant='h3' align='center'>
            Trailer
          </Typography>
        </Grid>
        <Grid item className={classes.youtubeGrid}>
          <YouTube
            videoId={movie.youtubeLink}
            className={classes.youtubePlayer}
            opts={youtubeOpts}
          />
        </Grid>
      </Grid>
      {hasActiveSubscription ? (
        <CommentsList
          currentUserAvatar={currentUserAvatar}
          handleCommentSet={handleCommentSet}
          comments={comments}
          currentUser={currentUser}
          handleDeleteCommentClick={handleDeleteCommentClick}
          dialogProps={dialogProps}
        />
      ) : (
        <Grid item container direction='column' alignContent='center' sx={{ pb: 5 }}>
          <Grid item>
            <Card>
              <CardContent>
                <Typography variant='h5' component='div'>
                  Oh, you don't have active subscription to see and post comments :(
                </Typography>
                <Typography variant='body2'>
                  If you want to see the terms and details of subscription activation, please go to
                  your profile using the button below
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button component={Link} to={routes.profile} size='small'>
                  Go to profile
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}
      {similarMovies.length > 0 && (
        <>
          <Grid item>
            <Typography variant='h3' align='center'>
              More like this
            </Typography>
          </Grid>
          <Grid item>
            <SimilarMovies similarMovies={similarMovies} />
          </Grid>
        </>
      )}
      <ScrollTopFab />
    </Grid>
  </Paper>
)

Movie.propTypes = {
  classes: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired,
  movieRating: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  currentUserAvatar: PropTypes.string,
  ratings: PropTypes.array.isRequired,
  genres: PropTypes.array,
  youtubeOpts: PropTypes.object.isRequired,
  settedRating: PropTypes.number,
  onRatingChange: PropTypes.func.isRequired,
  handleRatingSet: PropTypes.func.isRequired,
  handleCommentSet: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  handleDeleteCommentClick: PropTypes.func.isRequired,
  ratingHover: PropTypes.number.isRequired,
  setRatingHover: PropTypes.func.isRequired,
  dialogProps: PropTypes.object.isRequired,
  hasActiveSubscription: PropTypes.bool.isRequired,
  similarMovies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      cover: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
    })
  ),
}

export default withStyles(styles)(Movie)
