import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-mui'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material'

import styles from './styles'
import { AvatarPreview } from '@movie/modules/account/helpers'
import ChipsGenres from '@movie/modules/movieList/components/ChipsGenres'

const addMovieSchema = Yup.object().shape({
  title: Yup.string()
    .required('Required')
    .max(256, 'Maximum length is 256 characters'),
  description: Yup.string()
    .required('Required')
    .max(2048, 'Maximum length is 2048 characters'),
  youtubeLink: Yup.string()
    .required('Required')
    .max(128, 'Maximum length is 128 characters'),
  year: Yup.number()
    .required('Required')
    .min(0, 'Min 0')
    .max(9999, 'Max 9999'),
  genres: Yup.array()
    .min(1, 'Min 1 genre')
    .required('Required'),
})

const initial = {
  title: '',
  description: '',
  youtubeLink: '',
  year: '',
  cover: null,
  genres: [],
}

const AddEditMovieDialog = ({ classes, isOpen, onClose, onSubmit, movieToUpdate }) => {
  const isUpdateMode = Boolean(movieToUpdate)
  const uploadInputRef = useRef(null)

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth='md'>
      <DialogTitle>{isUpdateMode ? 'Edit movie' : 'Add movie'}</DialogTitle>
      <Formik
        initialValues={isUpdateMode ? movieToUpdate : initial}
        validationSchema={addMovieSchema}
        onSubmit={onSubmit}
      >
        {({ dirty, isValid, setFieldValue, values }) => (
          <Form autoComplete='off'>
            <DialogContent>
              <Grid container direction='column' spacing={2}>
                <Grid item alignSelf='center'>
                  <AvatarPreview file={values.cover} className={classes.cover} variant='rounded' />
                </Grid>
                <Grid item>
                  <input
                    type='file'
                    name='cover'
                    accept='image/*'
                    onChange={(e) => setFieldValue('cover', e.currentTarget.files[0])}
                    hidden
                    ref={uploadInputRef}
                  />
                  <Button
                    fullWidth
                    color='primary'
                    variant='contained'
                    onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
                  >
                    Upload cover
                  </Button>
                </Grid>
                <Grid item>
                  <Field
                    name='title'
                    label='Title'
                    color='primary'
                    required
                    component={TextField}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Field
                    name='description'
                    label='Description'
                    color='primary'
                    required
                    component={TextField}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Field
                    name='youtubeLink'
                    label='Youtube Link'
                    color='primary'
                    required
                    component={TextField}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Field
                    name='year'
                    label='Year'
                    color='primary'
                    required
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    component={TextField}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <ChipsGenres selectedGenres={values.genres} />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button disabled={!(isValid && dirty)} type='submit' color='primary'>
                {isUpdateMode ? 'Edit' : 'Add'}
              </Button>
              <Button onClick={onClose} color='primary'>
                Cancel
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}

AddEditMovieDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  movieToUpdate: PropTypes.object,
}

export default withStyles(styles)(AddEditMovieDialog)
