import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles';
import YouTube from 'react-youtube'
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Rating,
  Slider,
  Typography,
} from '@mui/material'

import CommentsList from '../CommentList'
import styles from './styles'

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
}) => (
  <div className={classes.selectedMovieBlock}>
    <Card className={classes.selectedMovieCardBlock}>
      <CardContent className={classes.selectedMovieCardContent}>
        <div className={classes.selectedMovieBody}>
          {
            movie.cover
              ? (
              <>
                <CardMedia className={classes.movieCardCover} image={movie.cover} />
              </>
              )
              : (
              <CircularProgress />
              )
          }
          <div className={classes.selectedMovieCardDescriptionBlock}>
            <Typography variant='h3'>{movie.title}</Typography>
            <Typography className={classes.selectedMovieRating}>
              Rating:
              {
                movieRating === 0
                ? 'No one has rated yet'
                : `${movieRating.toFixed(2)} / 10 (${ratings.length})`
              }
            </Typography>
            <Typography className={classes.secondPriorityText}>
              Genres:
              {genres?.length > 0 ? genres.map((genre) => ` ${genre.name}, `) : null}
            </Typography>
            <Typography className={classes.selectedMovieCardDescriptionText}>
              {movie.description}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
    <div className={classes.trailerBlock}>
      <Typography variant='h3'>Trailer</Typography>
      <YouTube videoId={movie.youtubeLink} className={classes.youtubePlayer} opts={youtubeOpts} />
    </div>
      <div className={classes.ratingBlock}>
        <Typography className={classes.secondPriorityText}>My rating:</Typography>
        <Rating 
          max={10}
          value={settedRating ?? 0}
          onChange={onRatingChange}
        />
        <Button size='small' color='primary' onClick={handleRatingSet}>
          Rate
        </Button>
      </div>
    <CommentsList
      currentUserAvatar={currentUserAvatar}
      handleCommentSet={handleCommentSet}
      comments={comments}
      currentUser={currentUser}
      handleDeleteCommentClick={handleDeleteCommentClick}
    />
  </div>
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
}

export default withStyles(styles)(Movie)
