import LoginView from "../views/Login";
import {useDispatch, useSelector} from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginRequest } from "../redux/actions";
import { useHistory } from "react-router-dom";
import {getUserLoading, isLoginSucceeded} from "../redux/selectors";
import {useEffect} from "react";

export const LoginContainer = () => {
    const isLogined = useSelector(isLoginSucceeded);
    const idLoading = useSelector(getUserLoading);
    const dispatch = useDispatch();
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email")
                .max(30, "Must be less than 30 characters")
                .required("Required"),
            password: Yup.string()
                .min(6, "Must be more than 6 characters")
                .max(50, "Must be less than 50 characters")
                .required("Required"),
        }),
        onSubmit: (values) => {
            dispatch(loginRequest(values));
        },
    });
    const touchedEmail = formik.touched.email;
    const emailErrors = formik.errors.email;
    const touchedPassword = formik.touched.password;
    const passwordError = formik.errors.password;
    const emailFieldProps = formik.getFieldProps('email');
    const passwordFieldProps = formik.getFieldProps('password');

    useEffect(() => {
        if(idLoading === false && isLogined === true)
            history.push("/");
    }, [idLoading, isLogined]);

    return <LoginView
        onSubmitForm={formik.handleSubmit}
        touchedEmail={touchedEmail}
        emailErrors={emailErrors}
        touchedPassword={touchedPassword}
        passwordError={passwordError}
        emailFieldProps={emailFieldProps}
        passwordFieldProps={passwordFieldProps}
    />;
};
