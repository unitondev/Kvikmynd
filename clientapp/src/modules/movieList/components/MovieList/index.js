import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Grid,
  Rating,
  Typography,
} from '@mui/material'

import styles from './styles'
import { calculateMovieRating } from '@movie/modules/movie/helpers'
import ScrollTop from '@movie/modules/navbar/components/ScrollTop'

const MovieList = ({ classes, movies }) => (
  <>
    <Grid container direction='column' spacing={5} sx={{ marginBottom: '100px' }}>
      {
        movies.length > 0
          ? (
            movies.map((movie) => {
              return (
                <Grid item key={movie.id}>
                  <Card>
                    <CardHeader
                      title={movie.title}
                    />
                    <CardContent>
                      <Grid container direction='row' spacing={2}>
                        <Grid item xs={3}>
                          <CardMedia
                            component='img'
                            height='400'
                            image={movie.cover}
                            alt={movie.title}
                          />
                        </Grid>
                        <Grid item xs={9}>
                          <Grid container direction='column'>
                            <Grid item>
                              <Rating
                                value={calculateMovieRating(movie.ratings) ?? 0}
                                readOnly
                                max={10}
                                precision={0.5}
                              />
                            </Grid>
                            <Grid item>
                              <Typography>
                                Genres: {movie.genres?.length > 0 ? movie.genres.map((g) => ` ${g.name}, `) : ''}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography>
                                {movie.description}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Button component={Link} to={`/movie${movie.id}`} size='small' color='primary'>
                        More details...
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            })
          )
          : (
            <CircularProgress className={classes.spinner} />
          )
      }
    </Grid>
    <ScrollTop />
  </>
)

MovieList.propTypes = {
  classes: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
}

export default withStyles(styles)(MovieList)
