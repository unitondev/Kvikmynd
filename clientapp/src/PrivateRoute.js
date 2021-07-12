import {Route, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {getJwt} from "./redux/selectors";

const PrivateRoute = ({component: Component, ...rest}) => {
    const jwtToken = useSelector(getJwt);
    return <Route
        {...rest}
        render={props => (
            jwtToken !== null
                ? <Component {...props} />
                : <Redirect to='/login'/>
        )}
    />
}

export default PrivateRoute;