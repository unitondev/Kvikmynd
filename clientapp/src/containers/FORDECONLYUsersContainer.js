import {fetchUsersSaga, testAuthorizeSaga} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {getJwt, getFetchedUsers} from "../redux/selectors";

export const Users = () => {
    const dispatch = useDispatch();
    const fetchedUsers = useSelector(getFetchedUsers);
    const token = useSelector(getJwt);

    if(!fetchedUsers.length){
        return (
            <div>
                <p> there aren't users </p>
                <button onClick={() => dispatch(fetchUsersSaga())}>Get users</button>
                <button onClick={() => dispatch(testAuthorizeSaga(token))}>Check auth</button>
            </div>);
    }

    return (
        <div>
            {fetchedUsers.map(user => (
                <p>id: {user.id}, name: {user.userName}, fullname: {user.fullName}, email: {user.email}</p>
            ))}
            <button onClick={() => dispatch(fetchUsersSaga)()}>Get users</button>
            <button onClick={() => dispatch(testAuthorizeSaga(token))}>Check auth</button>
        </div>
    );
};