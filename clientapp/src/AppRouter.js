import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {NavBarContainer} from "./containers/NavBarContainer";
import {LoginContainer} from "./containers/LoginContainer";
import {RegisterContainer} from "./containers/RegisterContainer";
import PrivateRoute from "./PrivateRoute";
import {ProfileContainer} from "./containers/ProfileContainer";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "./redux/selectors";
import {refreshTokensRequest} from "./redux/actions";

export const AppRouter = () => {
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    useEffect(() => {
        if(user === null)
            dispatch(refreshTokensRequest());
    }, []);

    return(
        <Router>
            <Switch>
                <Route exact path="/">
                    <NavBarContainer/>
                </Route>
                <Route path="/login">
                    <LoginContainer/>
                </Route>
                <Route path="/register">
                    <RegisterContainer/>
                </Route>
                <PrivateRoute
                    path="/profile"
                    component={() => (<ProfileContainer/>)}
                />
            </Switch>
        </Router>
    )
}
