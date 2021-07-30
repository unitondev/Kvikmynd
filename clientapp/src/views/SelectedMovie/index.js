import {withStyles} from "@material-ui/core/styles";
import styles from './styles'
import {NavBarContainer} from "../../containers/NavBarContainer";
import React from "react";
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardMedia, CircularProgress,
    IconButton,
    Slider,
    TextField,
    Typography
} from "@material-ui/core";
import YouTube from "react-youtube";
import DeleteIcon from '@material-ui/icons/Delete';
import NotificationContainer from "../../containers/NotificationsContainer";

const Index = (
    {
        classes,
        movie,
        comments,
        avatar,
        ratings,
        youtubeOpts,
        userRating,
        settedRating,
        onRatingChange,
        handleRatingSet,
        comment,
        onCommentChange,
        handleCommentSet,
        handleCommentsUpdateClick,
        handleRatingsUpdateClick,
        currentUserUserName,
        handleDeleteCommentClick
    }
) => (
    <>
        <NotificationContainer/>
        <NavBarContainer />
        <div className={classes.selectedMovieBlock}>
            <Card className={classes.selectedMovieCardBlock}>
                <CardContent className={classes.selectedMovieCardContent}>
                    <div className={classes.selectedMovieBody}>
                        {movie.cover
                            ?
                            (
                                <>
                                    <CardMedia
                                        className={classes.movieCardCover}
                                        image={movie.cover}
                                    />
                                </>
                            )
                            : (<CircularProgress />)
                        }
                        <div className={classes.selectedMovieCardDescriptionBlock}>
                            <Typography className={classes.selectedMovieCardTitle}>
                                {movie.title}
                            </Typography>
                            <Typography className={classes.selectedMovieRating}>
                                Rating: {movie.rating === 0 ? 'No one has rated yet' : `${(+movie.rating).toFixed(2)} / 10 (${ratings.length})`}
                            </Typography>
                            <Button size="small" color="primary" onClick={handleRatingsUpdateClick}>
                                Update rating
                            </Button>
                            <Typography className={classes.selectedMovieCardDescriptionText}>
                                {movie.description}
                            </Typography>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className={classes.trailerBlock}>
                <Typography className={classes.selectedMovieCardTitle}>
                    Trailer
                </Typography>
                <YouTube videoId={movie.youtubeLink} className={classes.youtubePlayer} opts={youtubeOpts}/>
            </div>
            <div className={classes.ratingBlock}>
                <Typography className={classes.selectedMovieCardTitle}>
                    Movie Rating: {movie.rating === 0 ? 'No one has rated yet' : (+movie.rating).toFixed(2)}
                </Typography>
                <div className={classes.descriptionRatingBlock}>
                    <Typography className={classes.secondPriorityText}>My rating:</Typography> {
                    userRating === 0
                        ?
                        (
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
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="auto"
                                    valueLabelDisplay="on"
                                />
                                <Button size="small" color="primary" onClick={handleRatingSet}>
                                    Rate
                                </Button>
                            </div>
                        )
                        : <Typography>{userRating}</Typography>
                }
                </div>
                <Typography className={classes.secondPriorityText}>
                    Total ratings: {ratings.length}
                </Typography>
                <div className={classes.commentsBlock}>
                    <Typography className={classes.selectedMovieCardTitle}>
                        Comments
                    </Typography>
                    <Button size="small" color="primary" onClick={handleCommentsUpdateClick}>
                        Update comments
                    </Button>
                    <div className={classes.CommentBlock}>
                        <Card className={classes.writingCommentCard}>
                            <div className={classes.commentHeader}>
                                <Avatar src={avatar} className={classes.avatarBlock} />
                                <Typography>Write your comment</Typography>
                            </div>
                            <CardContent className={classes.writingCommentContent}>
                                <TextField
                                    id="outlined-multiline-static"
                                    multiline
                                    rows={4}
                                    placeholder='Write your comment here'
                                    variant="outlined"
                                    value={comment}
                                    onChange={onCommentChange}
                                    className={classes.writingCommentTextArea}
                                />
                            </CardContent>
                            <Button size="small" color="primary" onClick={handleCommentSet}>
                                Send
                            </Button>
                        </Card>
                    </div>
                    {
                        comments.length > 0
                            ?
                            (
                                <div className={classes.CommentBlock}>
                                    {(comments.map(comment => {
                                        return (
                                            <Card className={classes.writingCommentCard} key={comment.commentId}>
                                                <div className={classes.commentHeader}>
                                                    <div className={classes.writingCommentUserData}>
                                                        <Avatar src={comment.userAvatar} className={classes.avatarBlock} />
                                                        <Typography>{comment.userName}</Typography>
                                                    </div>
                                                    <Typography>#{comment.commentId}</Typography>
                                                    {comment.userName === currentUserUserName
                                                        ? (<div>
                                                            <IconButton aria-label="delete" onClick={() => handleDeleteCommentClick(comment.commentId)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </div>)
                                                        : null
                                                    }
                                                </div>
                                                <CardContent className={classes.writingCommentContent}>
                                                    <TextField
                                                        id="outlined-multiline-static"
                                                        multiline
                                                        rows={2}
                                                        placeholder='Write your comment here'
                                                        variant="outlined"
                                                        value={comment.commentText}
                                                        onChange={onCommentChange}
                                                        className={classes.writingCommentTextArea}
                                                        disabled
                                                    />
                                                </CardContent>
                                            </Card>
                                        )
                                    }))}
                                </div>
                            )
                            :
                            <div className={classes.emptyCommentsBlock}/>
                    }
                </div>
            </div>
        </div>
    </>
);

export default withStyles(styles)(Index);