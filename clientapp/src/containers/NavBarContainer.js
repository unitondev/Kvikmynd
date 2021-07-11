import NavBar from "../views/NavBar";
import {useDispatch, useSelector} from "react-redux";
import {getFullName, getJwt, isLoginSucceeded} from "../redux/selectors";
import {logoutRequest} from "../redux/actions";

export const NavBarContainer = () => {
    const dispatch = useDispatch();
    const isLogined = useSelector(isLoginSucceeded);
    const fullName = useSelector(getFullName);
    const jwtToken = useSelector(getJwt);

    const onClickLogout = () => {
        dispatch(logoutRequest(jwtToken));
    }

    return (
        <NavBar
            isLogined={isLogined}
            fullName={fullName}
            onClickLogout={onClickLogout}
        />
    )
}