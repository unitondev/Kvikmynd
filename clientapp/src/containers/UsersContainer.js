import {fetchUsers} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";

export const Users = () => {
    const dispatch = useDispatch();
    const fetchedUsers = useSelector(state => state.users.fetchedUsers)

    if(!fetchedUsers.length){
        return (
            <div>
                <p> there aren't users </p>
                <button onClick={() => dispatch(fetchUsers())}>Get users</button>
            </div>);
    }

    return (
        <div>
            {fetchedUsers.map(user => (
                <p>id: {user.id}, name: {user.userName}, fullname: {user.fullName}, email: {user.email}</p>
            ))}
            <button onClick={() => dispatch(fetchUsers())}>Get users</button>
        </div>
    );
};