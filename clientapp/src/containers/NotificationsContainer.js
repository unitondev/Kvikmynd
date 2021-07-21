import {useDispatch, useSelector} from "react-redux";
import {getNotifications} from "../redux/selectors";
import {useEffect} from "react";
import {useSnackbar} from "notistack";
import {removeSnackbar} from "../redux/actions";

let displayed = [];

const NotificationContainer = () => {
    const dispatch = useDispatch();
    const storeDisplayed = (id) => {
        displayed = [...displayed, id];
    };

    const removeDisplayed = (id) => {
        displayed = [...displayed.filter(key => id !== key)];
    };

    const notifications = useSelector(getNotifications);
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        notifications.forEach(({key, message, options = {}}) => {
            enqueueSnackbar(message, {
                key,
                ...options,
                onExited: (event, newKey) => {
                    dispatch(removeSnackbar(newKey));
                    removeDisplayed(newKey)
                }
            });

            storeDisplayed(key);
        })
    }, [notifications]);

    return null;
}

export default NotificationContainer;