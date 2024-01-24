import PropTypes from 'prop-types'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import routes from '@movie/routes'

const SimilarMovies = ({ similarMovies }) => (
  <Paper elevation={0} sx={{ mb: 3 }}>
    <Grid container direction='row' spacing={2} justifyContent='center'>
      {similarMovies.map((movie) => (
        <Grid item key={movie.id}>
          <Card sx={{ width: '180px', height: '330px' }}>
            <CardActionArea component={Link} to={routes.movie(movie.id)}>
              <CardMedia component='img' height='250' image={movie.cover} alt={movie.title} />
              <CardContent>
                <Typography>{`${movie.title} (${movie.year})`}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Paper>
)

SimilarMovies.propTypes = {
  similarMovies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      cover: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
}

export default SimilarMovies
