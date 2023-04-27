import { Card, CardActions, CardContent, CardHeader, Grid, Skeleton } from '@mui/material'
import _ from 'lodash'
import React from 'react'

const SkeletonMovieListItem = () => (
  <Grid item>
    <Card>
      <CardHeader title={<Skeleton height={25} width='25%' animation='wave' />} />
      <CardContent>
        <Grid container direction='row' spacing={2}>
          <Grid item xs={3}>
            <Skeleton variant='rectangular' height={400} animation='wave' />
          </Grid>
          <Grid item xs={6}>
            <Grid container direction='column'>
              <Grid item>
                <Skeleton height={25} width='50%' animation='wave' />
              </Grid>
              <Grid item>
                <Skeleton height={20} width='40%' animation='wave' />
              </Grid>
              <Grid item>
                {_.times(8, (i) => (
                  <Skeleton key={i} height={20} width='100%' animation='wave' />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Skeleton height={25} width='10%' animation='wave' />
      </CardActions>
    </Card>
  </Grid>
)

export default SkeletonMovieListItem
