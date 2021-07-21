import {withStyles} from "@material-ui/core/styles";
import styles from "./styles";
import React from "react";
import {Button} from "@material-ui/core";
import {NavBarContainer} from "../../containers/NavBarContainer";

const Index = (
    {
        classes,
        deleteAccount
    }) => (
    <>
        <NavBarContainer />
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

export default withStyles(styles)(Index);