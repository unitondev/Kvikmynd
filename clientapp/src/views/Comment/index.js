import {withStyles} from "@material-ui/core/styles";
import styles from "./styles";
import {Avatar, Card, CardContent, IconButton, TextField, Typography} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import PropTypes from "prop-types";

const Index = (
    {
        classes,
        comment,
        currentUserUserName,
        handleDeleteCommentClick,
        onCommentChange
    }) => (
    <div className={classes.CommentBlock}>
        <Card className={classes.writingCommentCard}>
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
    </div>
);

Index.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    currentUserUserName: PropTypes.string.isRequired,
    handleDeleteCommentClick: PropTypes.func.isRequired,
    onCommentChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(Index);