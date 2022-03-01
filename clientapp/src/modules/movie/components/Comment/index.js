import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles';
import { Avatar, Card, CardContent, CardHeader, IconButton, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import styles from './styles'

const Comment = ({
  classes,
  comment,
  currentUserUserName,
  handleDeleteCommentClick,
}) => (
  <div className={classes.commentBlock}>
    <Card>
      <CardHeader
        avatar={
          <Avatar src={comment.userAvatar} />
        }
        title={comment.userName}
        subheader={`#${comment.commentId}`}
        action={
          comment.userName === currentUserUserName
          ?
          <IconButton
            aria-label='delete'
            onClick={() => handleDeleteCommentClick(comment.commentId)}
            size="large">
            <DeleteIcon />
          </IconButton>
          : <></>
        }
        titleTypographyProps={{ fontSize: 18 }}
      />
      <CardContent>
        <TextField
          multiline
          variant='outlined'
          value={comment.commentText}
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
}

export default withStyles(styles)(Comment)
