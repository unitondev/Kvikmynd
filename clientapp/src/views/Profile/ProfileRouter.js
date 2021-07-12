import {List, ListItem, ListItemText} from "@material-ui/core";
import React from "react";
import {withStyles} from "@material-ui/core/styles";
import styles from './styles'
import { NavBarContainer } from "../../containers/NavBarContainer";
import { Link } from "react-router-dom";
import { Route, Switch, useRouteMatch} from "react-router-dom";
import ProfileView from "./ProfileView";
import ProfileUpdateUserView from "./ProfileUpdateUserView";
import ProfileDeleteView from "./ProfileDeleteView";

const Index = (
    {
        classes,
        formik,
        user
    }) => {

    const {path, url} = useRouteMatch();
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return(
        <div>
            <NavBarContainer />
            <div className={classes.mainBlock}>
                <List
                    component='nav'
                    className={`${classes.root } ${classes.profileSectionsBlock}`}
                    aria-label="mailbox folders"
                >
                    <Link to={`${url}`} className={classes.navigationLink}>
                        <ListItem
                            button
                            selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 1)}
                        >
                            <ListItemText className={classes.listItemText} primary="User data"/>
                        </ListItem>
                    </Link>
                    <Link to={`${url}/update_user_react`} className={classes.navigationLink}>
                        <ListItem
                            button
                            selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0)}
                        >
                            <ListItemText className={classes.listItemText} primary="Edit user date"/>
                        </ListItem>
                    </Link>
                    <Link to={`${url}/delete_user_react`} className={classes.navigationLink}>
                        <ListItem
                            button
                            selected={selectedIndex === 2}
                            onClick={(event) => handleListItemClick(event, 2)}
                        >
                            <ListItemText className={classes.listItemText} primary="Delete account"/>
                        </ListItem>
                    </Link>
                </List>

                <Switch>
                    <Route exact path={`${path}`}>
                        <ProfileView
                            user={user}
                        />
                    </Route>
                    <Route exact path={`${path}/update_user_react`}>
                        <ProfileUpdateUserView
                            onSubmitForm={formik.handleSubmit}
                            formik={formik}
                        />
                    </Route>
                    <Route path={`${path}/delete_user_react`}>
                        <ProfileDeleteView

                        />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default withStyles(styles)(Index);