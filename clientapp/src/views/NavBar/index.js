import {withStyles} from "@material-ui/core/styles";
import styles from "./styles";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

function Index({classes}) {
    return(
        <nav>
            <ul className={classes.navBarLinks}>
                <li>
                    <NavLink
                        to="/"
                        className={classes.navBarLink}
                        activeClassName={classes.activeNavBarLink}
                        exact
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/login"
                        className={classes.navBarLink}
                        activeClassName={classes.activeNavBarLink}
                    >
                        Login</NavLink>
                </li>
                <li>
                    <NavLink
                        to="/register"
                        className={classes.navBarLink}
                        activeClassName={classes.activeNavBarLink}
                    >
                        Register</NavLink>
                </li>
                <li>
                    <NavLink
                        to="/users"
                        className={classes.navBarLink}
                        activeClassName={classes.activeNavBarLink}
                    >
                        Users</NavLink>
                </li>
            </ul>
        </nav>
    );
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Index)