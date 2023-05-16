import { useDispatch, useSelector } from 'react-redux'
import {
  cancelSubscription,
  createSubscription,
  getMySubscriptions,
} from '@movie/modules/account/actions'
import { useCallback, useEffect, useState } from 'react'
import { getMySubscriptionsSelector } from '@movie/modules/account/selectors'
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import { MoneyOff, CreditScore, Cancel, ToggleOn, ToggleOff } from '@mui/icons-material'
import CreateSubscriptionDialog from '@movie/modules/account/components/CreateSubscriptionDialog'
import moment from 'moment'
import { SubscriptionTypeDisplayName } from '../../../../Enums'

const Subscriptions = () => {
  const dispatch = useDispatch()
  const [dialogOpen, setDialogOpen] = useState(false)
  const onOpenDialog = useCallback(() => {
    setDialogOpen(true)
  }, [])
  const onCloseDialog = useCallback(() => {
    setDialogOpen(false)
  }, [])

  useEffect(() => {
    dispatch(getMySubscriptions.request())
  }, [dispatch])

  const mySubscriptions = useSelector(getMySubscriptionsSelector)
  const onSubmit = useCallback(
    (data) => {
      dispatch(createSubscription.request(data))
      onCloseDialog()
    },
    [dispatch, onCloseDialog]
  )

  const onCancelSubscription = useCallback(
    (id) => {
      dispatch(cancelSubscription.request({ id }))
    },
    [dispatch]
  )

  return (
    <>
      <Grid item container direction='column' spacing={3}>
        {mySubscriptions.length === 0 ? (
          <Grid item>
            <Typography>Seems like you didn't have ny subscription.</Typography>
          </Grid>
        ) : (
          <Grid item>
            <List>
              {mySubscriptions.map((subscription) => (
                <ListItem
                  key={subscription.id}
                  {...(subscription.active
                    ? {
                        secondaryAction: (
                          <IconButton
                            onClick={() => onCancelSubscription(subscription.id)}
                            title='Cancel'
                          >
                            <Cancel />
                          </IconButton>
                        ),
                      }
                    : {})}
                >
                  <ListItemAvatar title={subscription.active ? 'Active' : 'Canceled'}>
                    <Avatar>{subscription.active ? <ToggleOn /> : <ToggleOff />}</Avatar>
                  </ListItemAvatar>
                  <ListItemAvatar title={subscription.paid ? 'Paid' : 'Not paid'}>
                    <Avatar>{subscription.paid ? <CreditScore /> : <MoneyOff />}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${SubscriptionTypeDisplayName[subscription.type]} ($${
                      subscription.price
                    })`}
                    secondary={`Subscription is valid from ${moment(subscription.from).format(
                      'dddd, MMMM Do YYYY'
                    )} to ${moment(subscription.to).format('dddd, MMMM Do YYYY')}`}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        )}
        <Grid item>
          <Button size='large' fullWidth color='primary' variant='contained' onClick={onOpenDialog}>
            Subscribe
          </Button>
        </Grid>
      </Grid>
      <CreateSubscriptionDialog open={dialogOpen} onClose={onCloseDialog} onSubmit={onSubmit} />
    </>
  )
}

export default Subscriptions
