import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles';
import { Avatar, Card, CardContent, IconButton, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import styles from './styles'

const Comment = ({
  classes,
  comment,
  currentUserUserName,
  handleDeleteCommentClick,
  onCommentChange,
}) => (
  <div className={classes.CommentBlock}>
    <Card className={classes.writingCommentCard}>
      <div className={classes.commentHeader}>
        <div className={classes.writingCommentUserData}>
          <Avatar src={comment.userAvatar} className={classes.avatarBlock} />
          <Typography>{comment.userName}</Typography>
        </div>
        <Typography>#{comment.commentId}</Typography>
        {
          comment.userName === currentUserUserName
            ? (
              <div>
                <IconButton
                  aria-label='delete'
                  onClick={() => handleDeleteCommentClick(comment.commentId)}
                  size="large">
                  <DeleteIcon />
                </IconButton>
              </div>
            )
            : null
        }
      </div>
      <CardContent className={classes.writingCommentContent}>
        <TextField
          id='outlined-multiline-static'
          multiline
          rows={2}
          placeholder='Write your comment here'
          variant='outlined'
          value={comment.commentText}
          onChange={onCommentChange}
          className={classes.writingCommentTextArea}
          disabled
        />
      </CardContent>
    </Card>
  </div>
)

Comment.propTypes = {
  classes: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  currentUserUserName: PropTypes.string.isRequired,
  handleDeleteCommentClick: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(Comment)
