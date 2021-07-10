import RegisterView from "../views/Register";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {registerRequest} from "../redux/actions";

export const RegisterContainer = (props) => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            fullName: '',
            userName: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email')
                .max(30, 'Must be less than 30 characters')
                .required('Required'),
            password: Yup
                .string()
                .min(6, 'Must be more than 6 characters')
                .max(50, 'Must be less than 50 characters')
                .required('Required'),
            fullName: Yup.string().max(25, 'Must be less than 25 characters').required('Required'),
            userName: Yup.string().max(25, 'Must be less than 25 characters').required('Required')
        }),
        onSubmit: (values) => {
            dispatch(registerRequest(values));
        }
    });

    return <RegisterView
        onSubmitForm={formik.handleSubmit}
        formik={formik}
    />
};