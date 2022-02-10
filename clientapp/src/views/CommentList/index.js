import withStyles from '@mui/styles/withStyles';
import styles from './styles'
import { Avatar, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'
import Comment from '../Comment'

const Index = ({
  classes,
  avatar,
  writtenComment,
  onCommentChange,
  handleCommentSet,
  comments,
  currentUserUserName,
  handleDeleteCommentClick,
}) => (
  <div className={classes.commentsBlock}>
    <Typography className={classes.selectedMovieCardTitle}>Comments</Typography>
    <div className={classes.CommentBlock}>
      <Card className={classes.writingCommentCard}>
        <div className={classes.commentHeader}>
          <Avatar src={avatar} className={classes.avatarBlock} />
          <Typography>Write your comment</Typography>
        </div>
        <CardContent className={classes.writingCommentContent}>
          <TextField
            id='outlined-multiline-static'
            multiline
            rows={4}
            placeholder='Write your comment here'
            variant='outlined'
            value={writtenComment}
            onChange={onCommentChange}
            className={classes.writingCommentTextArea}
          />
        </CardContent>
        <Button size='small' color='primary' onClick={handleCommentSet}>
          Send
        </Button>
      </Card>
    </div>
    {
      comments.length > 0
        ? (
            comments.map((comment) => (
              <Comment
                key={comment.commentId}
                comment={comment}
                currentUserUserName={currentUserUserName}
                handleDeleteCommentClick={handleDeleteCommentClick}
                onCommentChange={onCommentChange}
              />
            ))
        )
        : (
          <div className={classes.emptyCommentsBlock} />
        )
    }
  </div>
)

Index.propTypes = {
  classes: PropTypes.object.isRequired,
  avatar: PropTypes.string.isRequired,
  writtenComment: PropTypes.string.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  handleCommentSet: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
  currentUserUserName: PropTypes.string.isRequired,
  handleDeleteCommentClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(Index)
