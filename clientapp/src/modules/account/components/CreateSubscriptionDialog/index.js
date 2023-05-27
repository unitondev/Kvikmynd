import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Typography,
} from '@mui/material'
import PropTypes from 'prop-types'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Select, TextField } from 'formik-mui'
import moment from 'moment'
import { SubscriptionType, SubscriptionTypeDescription } from '../../../../Enums'

import useStyles from './styles'

const initial = {
  Type: '',
  CreditCardNumber: '',
  Price: 9.99,
}

const subscriptionSchema = Yup.object().shape({
  Type: Yup.number().required('Required'),
  CreditCardNumber: Yup.string()
    .matches(/^[0-9]{16}$/, 'Credit card number is invalid')
    .required('Required'),
})

const CreateSubscriptionDialog = ({
  open,
  onClose,
  onSubmit,
  specialOrderSubscriptionType,
  specialOrderSubscriptionPrice,
}) => {
  const classes = useStyles()
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <Formik
        initialValues={{
          ...initial,
          ...(specialOrderSubscriptionType ? { Type: specialOrderSubscriptionType } : {}),
          ...(specialOrderSubscriptionPrice ? { Price: specialOrderSubscriptionPrice } : {}),
        }}
        onSubmit={(data) => {
          onSubmit({
            Paid: true,
            From: moment.utc(),
            To: moment.utc().add(30, 'd').endOf('day'),
            ...data,
          })
        }}
        validationSchema={subscriptionSchema}
      >
        {({ dirty, isValid, values, initialValues }) => (
          <Form autoComplete='off'>
            <DialogTitle>Subscription</DialogTitle>
            <DialogContent>
              <Grid container direction='column' spacing={2}>
                <Grid item>
                  <Field
                    name='Type'
                    label='Type'
                    color='primary'
                    required
                    fullWidth
                    component={Select}
                    disabled={Boolean(specialOrderSubscriptionType)}
                    formControl={{
                      className: classes.select,
                    }}
                  >
                    {Object.entries(SubscriptionType).map(([title, value]) => (
                      <MenuItem key={value} value={value}>
                        {title}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                {values.Type && (
                  <Grid item>
                    <Typography>
                      {SubscriptionTypeDescription[values.Type]}
                      {` Buy it only for $${initialValues.Price}`}
                    </Typography>
                  </Grid>
                )}
                {values.Type && (
                  <Grid item>
                    <Field
                      name='CreditCardNumber'
                      label='Credit card number'
                      color='primary'
                      component={TextField}
                      fullWidth
                    />
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button disabled={!(isValid && dirty)} type='submit' color='primary'>
                Submit
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}

CreateSubscriptionDialog.defaultProps = {
  specialOrderSubscriptionType: 0,
  specialOrderSubscriptionPrice: 0,
}

CreateSubscriptionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  specialOrderSubscriptionType: PropTypes.number,
  specialOrderSubscriptionPrice: PropTypes.number,
}

export default CreateSubscriptionDialog
