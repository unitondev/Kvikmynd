import {useDispatch, useSelector} from "react-redux";
import {getJwt, getUser, getUserAvatar} from "../redux/selectors";
import {updateUserRequest} from "../redux/actions";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useHistory} from "react-router-dom";
import React from "react";
import ProfileRouter from "../views/Profile/ProfileRouter";
import {toBase64} from "../helpers";


export const ProfileContainer = () => {
    const user = useSelector(getUser);
    const jwtToken = useSelector(getJwt);
    const currentAvatar = useSelector(getUserAvatar);
    const dispatch = useDispatch();
    const history = useHistory();
    const requiredMessage = 'This field is required';
    const handleSelectingFile = event => {
        formik.setFieldValue('avatar',
            event.currentTarget.files[0]);
    }

    const formik = useFormik({
        initialValues: {
            email: `${user.email}`,
            userName: `${user.userName}`,
            fullName: `${user.fullName}`,
            oldPassword: '',
            newPassword: '',
            avatar: null,
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email')
                .max(30, 'Must be less than 30 characters')
                .required(requiredMessage),
            oldPassword: Yup
                .string()
                .max(50, 'Must be less than 50 characters'),
            newPassword: Yup
                .string()
                .max(50, 'Must be less than 50 characters'),
            userName: Yup.string().max(25, 'Must be less than 25 characters'),
            fullName: Yup.string().max(25, 'Must be less than 25 characters'),
        }),
        onSubmit: async values => {
            if(values.avatar != null)
                values.avatar =  await toBase64(values.avatar)
            else
                values.avatar = currentAvatar;
            dispatch(updateUserRequest({...values, jwtToken}));
            history.push('/login');
        }
    });

    return(
        <ProfileRouter
            onSubmitForm={formik.handleSubmit}
            formik={formik}
            user={user}
            toBase64={toBase64}
            currentAvatar={currentAvatar}
            handleSelectingFile={handleSelectingFile}
        />
    )
}

