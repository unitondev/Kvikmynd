import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles';
import YouTube from 'react-youtube'
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
} from '@mui/material'

import CommentsList from '../CommentList'
import styles from './styles'
import ScrollTop from '@movie/modules/navbar/components/ScrollTop'

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
}) => (
  <Paper>
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <Card>
          <CardContent>
            <Grid container direction='column' spacing={2}>
              <Grid item>
                <Typography variant='h2' align='center'>{movie.title}</Typography>
              </Grid>
              <Grid item container direction='row' spacing={2}>
                <Grid item xs={3}>
                  <CardMedia
                    component='img'
                    height='400'
                    image={movie.cover}
                    alt={movie.title}
                  />
                </Grid>
                <Grid item xs={9}>
                  <Grid container direction='column'>
                    <Grid item>
                      <Typography>
                        Rating:
                        {
                          movieRating === 0
                          ? 'No one has rated yet'
                          : `${movieRating.toFixed(2)} / 10 (${ratings.length})`
                        }
                      </Typography>
                    </Grid>
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
                      { settedRating !== null && (
                        <Grid item xs={0.5}>
                          <Box className={classes.ratingBox}>
                            <Typography align='center'>{ratingHover !== -1 ? ratingHover : settedRating}</Typography>
                          </Box>
                        </Grid>
                      )}
                      <Grid item xs={1}>
                        <Button size='small' color='primary' onClick={handleRatingSet}>
                          Rate
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography>
                        Genres: {genres?.length > 0 ? genres.map((genre) => ` ${genre.name}, `) : null}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        {movie.description}
                      </Typography>
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
          <Typography variant='h3' align='center'>Trailer</Typography>
        </Grid>
        <Grid item className={classes.youtubeGrid}>
          <YouTube videoId={movie.youtubeLink} className={classes.youtubePlayer} opts={youtubeOpts} />
        </Grid>
      </Grid>
      <CommentsList
        currentUserAvatar={currentUserAvatar}
        handleCommentSet={handleCommentSet}
        comments={comments}
        currentUser={currentUser}
        handleDeleteCommentClick={handleDeleteCommentClick}
        dialogProps={dialogProps}
      />
      <ScrollTop />
    </Grid>
  </Paper>
)

Movie.propTypes = {
  classes: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired,
  movieRating: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  currentUserAvatar: PropTypes.string.isRequired,
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
}

export default withStyles(styles)(Movie)
