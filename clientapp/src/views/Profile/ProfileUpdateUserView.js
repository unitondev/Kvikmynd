import React, {useState} from 'react'
import {withStyles} from "@material-ui/core/styles";
import styles from "./styles";
import {Avatar, Button, Card, CardContent, TextField, Typography} from "@material-ui/core";

const Index = (
    {
        classes,
        onSubmitForm,
        formik,
        toBase64,
        currentAvatar,
        avatar,
        handleSelectingFile
}) =>
{

    const onFileChange = event => {
        let file = event.target.files[0];
        if( file.type.includes('image')){
            toBase64(file)
                .then(result => handleSelectingFile(result))
                .catch(error => console.log(error))
        }
    };

    return(
        <div className={classes.profileBlock}>
            <div className={classes.profileInfoBlock}>
                <form className={classes.formBlock} onSubmit={onSubmitForm}>
                    <div className={classes.avatarProfile}>
                        <Avatar src={currentAvatar} className={classes.avatarBig}/>
                        <input type='file' onChange={onFileChange}/>
                        {avatar !== null
                            ? <p>Filename: {avatar.name}</p>
                            : null}
                    </div>
                    <div className={classes.profileInfoString}>
                        <Card className={classes.cardBlock}>
                            <CardContent className={classes.cardContent}>
                                <Typography
                                    variant='h6'
                                    className={classes.profileInfoStringKey}
                                >
                                    Full Name:
                                </Typography>
                                <TextField
                                    error={!!(formik.touched.fullName && formik.errors.fullName)}
                                    helperText={!!(formik.touched.fullName && formik.errors.fullName) === false ? null : formik.errors.fullName}
                                    label="Full name"
                                    type='text'
                                    variant="standard"
                                    {...formik.getFieldProps('fullName')}
                                >
                                </TextField>
                            </CardContent>
                        </Card>
                    </div>
                    <div className={classes.profileInfoString}>
                        <Card className={classes.cardBlock}>
                            <CardContent className={classes.cardContent}>
                                <Typography
                                    variant='h6'
                                    className={classes.profileInfoStringKey}
                                >
                                    User Name:
                                </Typography>
                                <TextField
                                    error={!!(formik.touched.userName && formik.errors.userName)}
                                    helperText={!!(formik.touched.userName && formik.errors.userName) === false ? null : formik.errors.userName}
                                    label="User name"
                                    type='text'
                                    variant="standard"
                                    {...formik.getFieldProps('userName')}
                                >
                                </TextField>
                            </CardContent>
                        </Card>
                    </div>
                    <div className={classes.profileInfoString}>
                        <Card className={classes.cardBlock}>
                            <CardContent className={classes.cardContent}>
                                <Typography
                                    variant='h6'
                                    className={classes.profileInfoStringKey}
                                >
                                    Email:
                                </Typography>
                                <TextField
                                    error={!!(formik.touched.email && formik.errors.email)}
                                    helperText={!!(formik.touched.email && formik.errors.email) === false ? null : formik.errors.email}
                                    label="Email"
                                    type='text'
                                    variant="standard"
                                    {...formik.getFieldProps('email')}
                                >
                                </TextField>
                            </CardContent>
                        </Card>
                    </div>
                    <div className={classes.profileInfoString}>
                        <Card className={classes.cardBlock}>
                            <CardContent className={classes.cardContent}>
                                <Typography
                                    variant='h6'
                                    className={classes.profileInfoStringKey}
                                >
                                    Old password:
                                </Typography>
                                <TextField
                                    error={!!(formik.touched.oldPassword && formik.errors.oldPassword)}
                                    helperText={!!(formik.touched.oldPassword && formik.errors.oldPassword) === false ? null : formik.errors.oldPassword}
                                    label="Old password"
                                    type='password'
                                    variant="standard"
                                    {...formik.getFieldProps('oldPassword')}
                                >
                                </TextField>
                            </CardContent>
                        </Card>
                    </div>
                    <div className={classes.profileInfoString}>
                        <Card className={classes.cardBlock}>
                            <CardContent className={classes.cardContent}>
                                <Typography
                                    variant='h6'
                                    className={classes.profileInfoStringKey}
                                >
                                    New password:
                                </Typography>
                                <TextField
                                    error={!!(formik.touched.newPassword && formik.errors.newPassword)}
                                    helperText={!!(formik.touched.newPassword && formik.errors.newPassword) === false ? null : formik.errors.newPassword}
                                    label="New password"
                                    type='password'
                                    variant="standard"
                                    {...formik.getFieldProps('newPassword')}
                                >
                                </TextField>
                            </CardContent>
                        </Card>
                    </div>
                    <div className={classes.buttonBlock}>
                        <Button
                            variant="contained"
                            className={classes.updateButton}
                            type='submit'
                        >
                            Update information
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default withStyles(styles)(Index);

