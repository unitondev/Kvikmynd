import NavBar from "../views/NavBar";
import {useDispatch, useSelector} from "react-redux";
import {getFullName, getUserAvatar, isLoginSucceeded} from "../redux/selectors";
import {logoutRequest} from "../redux/actions";
import {useHistory} from "react-router-dom";

export const NavBarContainer = () => {
    const dispatch = useDispatch();
    const isLogined = useSelector(isLoginSucceeded);
    const fullName = useSelector(getFullName);
    const avatar = useSelector(getUserAvatar);
    const history = useHistory();

    const onClickLogout = () => {
        dispatch(logoutRequest());
        history.push('/');
    }

    return (
        <NavBar
            isLogined={isLogined}
            fullName={fullName}
            avatar={avatar}
            onClickLogout={onClickLogout}
        />
    )
}