import {withStyles} from "@material-ui/core/styles";
import {styles} from "./styles";
import {NavBarContainer} from "../../containers/NavBarContainer";

const Index = (
    {
        classes,
        user
}) => {
    return(
        <>
            <NavBarContainer />
            <div className={classes.profileBlock}>
                <div className={classes.profileSectionsBlock}>
                    <div>
                        <div className={classes.profileSection}>
                            User data
                        </div>
                        <div className={classes.profileSection}>
                            Edit User data
                        </div>
                    </div>
                </div>
                <div className={classes.profileInfoBlock}>
                    <div className={classes.profileInfoString}>
                        <p className={classes.profileInfoStringKey}>
                            fullName:
                        </p>
                        <p className={classes.profileInfoStringValue}>
                            {user.fullName}
                        </p>
                    </div>
                    <div className={classes.profileInfoString}>
                        <p className={classes.profileInfoStringKey}>
                            userName:
                        </p>
                        <p className={classes.profileInfoStringValue}>
                            {user.userName}
                        </p>
                    </div>
                    <div className={classes.profileInfoString}>
                        <p className={classes.profileInfoStringKey}>
                            email
                        </p>
                        <p className={classes.profileInfoStringValue}>
                            {user.email}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
};

export default withStyles(styles)(Index);