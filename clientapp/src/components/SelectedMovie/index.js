import withStyles from '@mui/styles/withStyles';
import styles from './styles'
import { NavBarContainer } from '../../containers/NavBarContainer'
import React from 'react'
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Slider,
  Typography,
} from '@mui/material'
import YouTube from 'react-youtube'
import NotificationContainer from '../../containers/NotificationsContainer'
import PropTypes from 'prop-types'
import CommentsList from '../CommentList'

const Index = ({
  classes,
  movie,
  comments,
  avatar,
  ratings,
  genres,
  youtubeOpts,
  userRating,
  settedRating,
  onRatingChange,
  handleRatingSet,
  writtenComment,
  onCommentChange,
  handleCommentSet,
  currentUserUserName,
  handleDeleteCommentClick,
}) => (
  <>
    <NotificationContainer />
    <NavBarContainer />
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
              <Typography className={classes.selectedMovieCardTitle}>{movie.title}</Typography>
              <Typography className={classes.selectedMovieRating}>
                Rating:{' '}
                {movie.rating === 0
                  ? 'No one has rated yet'
                  : `${(+movie.rating).toFixed(2)} / 10 (${ratings.length})`}
              </Typography>
              <Typography className={classes.secondPriorityText}>
                Genres:
                {genres?.length > 0 ? genres.map((genre) => ` ${genre}, `) : null}
              </Typography>
              <Typography className={classes.selectedMovieCardDescriptionText}>
                {movie.description}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className={classes.trailerBlock}>
        <Typography className={classes.selectedMovieCardTitle}>Trailer</Typography>
        <YouTube videoId={movie.youtubeLink} className={classes.youtubePlayer} opts={youtubeOpts} />
      </div>
      <div className={classes.ratingBlock}>
        <Typography className={classes.selectedMovieCardTitle}>
          Movie Rating: {movie.rating === 0 ? 'No one has rated yet' : (+movie.rating).toFixed(2)}
        </Typography>
        <div className={classes.descriptionRatingBlock}>
          <Typography className={classes.secondPriorityText}>My rating:</Typography>{' '}
          {
            userRating === 0
              ? (
              <div className={classes.setRatingBlock}>
                <Typography>You did not rate.</Typography>
                <Slider
                  className={classes.ratingSlider}
                  defaultValue={0}
                  value={settedRating}
                  onChange={onRatingChange}
                  step={1}
                  min={0}
                  max={10}
                  marks
                  aria-labelledby='discrete-slider'
                  valueLabelDisplay='auto'
                  valueLabelDisplay='on'
                />
                <Button size='small' color='primary' onClick={handleRatingSet}>
                  Rate
                </Button>
              </div>
              )
              : (
                <Typography>{userRating}</Typography>
              )
          }
        </div>
        <Typography className={classes.secondPriorityText}>
          Total ratings: {ratings.length}
        </Typography>
      </div>
      <CommentsList
        avatar={avatar}
        writtenComment={writtenComment}
        onCommentChange={onCommentChange}
        handleCommentSet={handleCommentSet}
        comments={comments}
        currentUserUserName={currentUserUserName}
        handleDeleteCommentClick={handleDeleteCommentClick}
      />
    </div>
  </>
)

Index.propTypes = {
  classes: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  avatar: PropTypes.string.isRequired,
  ratings: PropTypes.array.isRequired,
  genres: PropTypes.array,
  youtubeOpts: PropTypes.object.isRequired,
  userRating: PropTypes.number.isRequired,
  settedRating: PropTypes.number.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  handleRatingSet: PropTypes.func.isRequired,
  writtenComment: PropTypes.string.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  handleCommentSet: PropTypes.func.isRequired,
  currentUserUserName: PropTypes.string.isRequired,
  handleDeleteCommentClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(Index)