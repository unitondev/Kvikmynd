import {withStyles} from "@material-ui/core/styles";
import styles from './styles'
import NavBar from '../NavBar/index'
import {Button, TextField, Typography} from "@material-ui/core";

const Index = (
    {
        classes,
        onSubmitForm,
        formik
    }) => {
    return(<div>
        <NavBar />
        <div className={classes.viewTitleBlock}>
            <Typography
                variant="h2"
                component="h2"
                className={classes.viewTitleText}
            >
                Register
            </Typography>
        </div>
        <div className={classes.registerFormBlock}>
            <form
                className={classes.registerForm}
                onSubmit={onSubmitForm}
            >
                <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    helperText={!!(formik.touched.email && formik.errors.email) === false ? null : formik.errors.email}
                    label="Email"
                    type='text'
                    className={classes.textField}
                    variant="outlined"
                    {...formik.getFieldProps('email')}
                >
                </TextField>
                <TextField
                    error={!!(formik.touched.userName && formik.errors.userName)}
                    helperText={!!(formik.touched.userName && formik.errors.userName) === false ? null : formik.errors.userName}
                    label="User Name"
                    type='text'
                    className={classes.textField}
                    variant="outlined"
                    {...formik.getFieldProps('userName')}
                >
                </TextField>
                <TextField
                    error={!!(formik.touched.fullName && formik.errors.fullName)}
                    helperText={!!(formik.touched.fullName && formik.errors.fullName) === false ? null : formik.errors.fullName}
                    label="Full Name"
                    type='text'
                    className={classes.textField}
                    variant="outlined"
                    {...formik.getFieldProps('fullName')}
                >
                </TextField>
                <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    helperText={!!(formik.touched.password && formik.errors.password) === false ? null : formik.errors.password}
                    label="Password"
                    type='password'
                    className={classes.textField}
                    variant="outlined"
                    {...formik.getFieldProps('password')}
                >
                </TextField>
                <Button
                    variant="outlined"
                    color="primary"
                    type='submit'
                >
                    Register
                </Button>
            </form>
        </div>
    </div>);
}

export default withStyles(styles)(Index);