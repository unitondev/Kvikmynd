import {withStyles} from "@material-ui/core/styles";
import styles from "./styles";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

function Index({classes, isLogined, fullName, onClickLogout}) {
    return(
        <nav>
            <ul className={classes.navBarLinks}>
                <li>
                    <NavLink
                        to="/"
                        className={classes.navBarLink}
                        hover='true'
                        activeClassName={classes.activeNavBarLink}
                        exact
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    {isLogined
                        ? null
                        : <NavLink
                            to="/login"
                            className={classes.navBarLink}
                            hover='true'
                            activeClassName={classes.activeNavBarLink}
                        >
                            Login
                        </NavLink>
                    }
                </li>
                <li>
                    {isLogined
                        ? null
                        : <NavLink
                            to="/register"
                            className={classes.navBarLink}
                            hover='true'
                            activeClassName={classes.activeNavBarLink}
                        >
                            Register
                        </NavLink>
                    }
                </li>
                <li>
                    {!isLogined
                        ? null
                        : <NavLink
                            to="/profile"
                            className={classes.navBarLink}
                            hover='true'
                            activeClassName={classes.activeNavBarLink}
                        >
                            Hello, {fullName}
                        </NavLink>
                    }
                </li>
                <li>
                    {!isLogined
                        ? null
                        :
                        <button
                            className={classes.navBarButton}
                            onClick={onClickLogout}
                        >
                            Logout
                        </button>
                    }
                </li>
            </ul>
        </nav>
    );
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Index)