import ProfileView from '../views/Profile'
import {useSelector} from "react-redux";
import {getUser} from "../redux/selectors";

export const ProfileContainer = () => {
    const user = useSelector(getUser);

    return <ProfileView
        user={user}
    />
}

