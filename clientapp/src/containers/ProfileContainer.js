import {useDispatch, useSelector} from "react-redux";
import {getJwt, getUser, getUserAvatar} from "../redux/selectors";
import {updateUserRequest} from "../redux/actions";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useHistory} from "react-router-dom";
import React, {useState} from "react";
import ProfileRouter from "../views/Profile/ProfileRouter";

export const ProfileContainer = () => {
    const user = useSelector(getUser);
    const jwtToken = useSelector(getJwt);
    const currentAvatar = useSelector(getUserAvatar);
    const dispatch = useDispatch();
    const history = useHistory();
    const requiredMessage = 'This field is required';
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => (resolve(reader.result));
        reader.onerror = error => reject(error);
    })
    const [avatar, setAvatar] = useState(null);
    const handleSelectingFile = (result) => {
        setAvatar(result);
    }

    const formik = useFormik({
        initialValues: {
            email: `${user.email}`,
            userName: `${user.userName}`,
            fullName: `${user.fullName}`,
            oldPassword: '',
            newPassword: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email')
                .max(30, 'Must be less than 30 characters')
                .required(requiredMessage),
            oldPassword: Yup
                .string()
                .min(6, 'Must be more than 6 characters')
                .max(50, 'Must be less than 50 characters')
                .required(requiredMessage),
            newPassword: Yup
                .string()
                .min(6, 'Must be more than 6 characters')
                .max(50, 'Must be less than 50 characters')
                .required(requiredMessage),
            userName: Yup.string().max(25, 'Must be less than 25 characters'),
            fullName: Yup.string().max(25, 'Must be less than 25 characters'),
        }),
        onSubmit: (values) => {
            dispatch(updateUserRequest({...values, avatar, jwtToken}));
            history.push('/login');
        }
    });

    return(
        <ProfileRouter
            formik={formik}
            user={user}
            toBase64={toBase64}
            currentAvatar={currentAvatar}
            avatar={avatar}
            handleSelectingFile={handleSelectingFile}
        />
    )
}

