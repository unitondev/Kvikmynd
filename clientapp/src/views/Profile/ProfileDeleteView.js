import {withStyles} from "@material-ui/core/styles";
import styles from "./styles";
import React from "react";
import {Button} from "@material-ui/core";

const Index = (
    {
        classes,
        deleteAccount
    }) => (
    <div className={classes.profileBlock}>
        <div className={classes.buttonBlock}>
            <Button
                variant="contained"
                className={classes.updateButton}
                onClick={deleteAccount}
            >
                Delete my account
            </Button>
        </div>
    </div>
);

export default withStyles(styles)(Index);