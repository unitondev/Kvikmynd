import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import { MoneyOff, CreditScore, Cancel, ToggleOn, ToggleOff } from '@mui/icons-material'
import moment from 'moment'

import {
  cancelSubscription,
  createSubscription,
  getMySpecialOrders,
  getMySubscriptions,
} from '@movie/modules/account/actions'
import { getMySubscriptionsSelector } from '@movie/modules/account/selectors'
import CreateSubscriptionDialog from '@movie/modules/account/components/CreateSubscriptionDialog'
import { SubscriptionTypeDisplayName } from '../../../../Enums'
import { callApiPromise } from '../../../../state/createStore'

const Subscriptions = () => {
  const dispatch = useDispatch()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [specialOrders, setSpecialOrders] = useState([])
  const [createSubscriptionDialogProps, setCreateSubscriptionDialogProps] = useState({})
  const mySubscriptions = useSelector(getMySubscriptionsSelector)

  const onOpenDialog = useCallback(() => {
    setDialogOpen(true)
  }, [])
  const onCloseDialog = useCallback(() => {
    setCreateSubscriptionDialogProps({})
    setDialogOpen(false)
  }, [])

  const fetchSpecialOrders = useCallback(async () => {
    const {
      response: {
        data: { result },
      },
    } = await callApiPromise(getMySpecialOrders.request())
    return result
  }, [])

  useEffect(() => {
    if (mySubscriptions?.length > 0) {
      const last = mySubscriptions.find((element) => element.active)
      if (moment(last.to).diff(moment().utc(), 'days') <= 2) {
        fetchSpecialOrders().then((result) => setSpecialOrders(result))
      }
    }
  }, [fetchSpecialOrders, mySubscriptions?.length, mySubscriptions])

  useEffect(() => {
    dispatch(getMySubscriptions.request())
  }, [dispatch])

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
        {specialOrders.length > 0 && (
          <Grid item>
            <Card sx={{ backgroundColor: '#ff8a80' }}>
              <CardHeader title='Special order for you!' />
              <CardContent>
                <Typography variant='body1'>
                  We can provide you a special order.{' '}
                  {`${SubscriptionTypeDisplayName[specialOrders[0].type]} subscription only for $${
                    specialOrders[0].price
                  } `}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={() => {
                    setCreateSubscriptionDialogProps({
                      specialOrderSubscriptionType: specialOrders[0].type,
                      specialOrderSubscriptionPrice: specialOrders[0].price,
                    })
                    onOpenDialog()
                  }}
                >
                  Subscribe!
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )}
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
      <CreateSubscriptionDialog
        open={dialogOpen}
        onClose={onCloseDialog}
        onSubmit={onSubmit}
        {...createSubscriptionDialogProps}
      />
    </>
  )
}

export default Subscriptions
