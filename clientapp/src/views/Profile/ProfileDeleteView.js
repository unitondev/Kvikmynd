import {withStyles} from "@material-ui/core/styles";
import styles from "./styles";
import React from "react";
import {Button} from "@material-ui/core";
import PropTypes from "prop-types";

const Index = (
    {
        classes,
        deleteAccount
    }) => (
    <>
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
    </>
);

Index.propTypes = {
    classes: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
}

export default withStyles(styles)(Index);