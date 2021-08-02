import {Route, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {getJwt, isLoginSucceeded} from "./redux/selectors";
import {CircularProgress} from "@material-ui/core";
import React from "react";

const PrivateRoute = ({component: Component, ...rest}) => {
    const jwtToken = useSelector(getJwt);
    const isLogined = useSelector(isLoginSucceeded);
    if( isLogined === undefined ){
        return <CircularProgress/>
    } else {
        return <Route
            {...rest}
            render={props => (
                !!jwtToken
                    ? <Component {...props} />
                    : <Redirect to='/login'/>
            )}
        />
    }
}

export default PrivateRoute;