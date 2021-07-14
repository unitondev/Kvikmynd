import RegisterView from "../views/Register";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {registerRequest} from "../redux/actions";
import {useHistory} from "react-router-dom";
import {toBase64} from "../helpers";

export const RegisterContainer = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleSelectingFile = event => {
        formik.setFieldValue('avatar',
            event.currentTarget.files[0]);
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            fullName: '',
            userName: '',
            avatar: null
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
            if(!!values.avatar){
                let promise = toBase64(values.avatar);
                promise.then(result => {
                        values.avatar = result;
                        dispatch(registerRequest(values));
                        history.push('/');
                    },
                    error => console.log(error)
                )
            }
            dispatch(registerRequest(values));
            history.push('/');
        }
    });

    return <RegisterView
        onSubmitForm={formik.handleSubmit}
        formik={formik}
        handleSelectingFile={handleSelectingFile}
    />
};