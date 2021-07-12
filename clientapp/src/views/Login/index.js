import {withStyles} from "@material-ui/core/styles";
import styles from './styles'
import {Button, TextField, Typography} from "@material-ui/core";
import {NavBarContainer} from "../../containers/NavBarContainer";

const Index = (
    {
        classes,
        onSubmitForm,
        formik
    }) => {
    return(
        <>
            <NavBarContainer />
            <div className={classes.viewTitleBlock}>
                <Typography
                    variant="h2"
                    component="h2"
                    className={classes.viewTitleText}
                >
                    Login
                </Typography>
            </div>
            <div className={classes.loginFormBlock}>
                <form
                    className={classes.loginForm}
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
                        Login
                    </Button>
                </form>
            </div>
        </>
    );
}

export default withStyles(styles)(Index);