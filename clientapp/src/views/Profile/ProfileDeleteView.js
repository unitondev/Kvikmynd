import {withStyles} from "@material-ui/core/styles";
import styles from "./styles";
import React from "react";
import {Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getJwt} from "../../redux/selectors";
import {deleteUserRequest} from "../../redux/actions";
import {useHistory} from "react-router-dom";

const Index = (
    {
        classes
    }) => {
    const dispatch = useDispatch();
    const jwtToken = useSelector(getJwt);
    const history = useHistory();

    const deleteAccount = () => {
        dispatch(deleteUserRequest(jwtToken));
        history.push('/');
    }

    return(
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
}

export default withStyles(styles)(Index);