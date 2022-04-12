import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import {
  Box,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material'

import styles from './styles'

const PromoMovie = ({ classes }) => (
  <Grid item>
    <Box className={classes.promoRoot}>
      <Box className={classes.linearBlock} />
      <Box className={classes.videoBlock}>
        <video
          src='https://firebasestorage.googleapis.com/v0/b/kvikmynd-2c013.appspot.com/o/videos%2FTheBatmanCropped.mp4?alt=media&token=18057ddc-8331-4577-adf8-89d9484157ac'
          autoPlay
          muted
          loop
          height={400}
          className={classes.video}
        >
        </video>
      </Box>
      <Box className={classes.contentPromoParent}>
        <Box className={classes.contentPromo}>
          <Box sx={{marginBottom: '20px'}}>
            <CardMedia
              component='img'
              src='https://firebasestorage.googleapis.com/v0/b/kvikmynd-2c013.appspot.com/o/videos%2FTheBatman2022Logo.png?alt=media&token=f2b06495-9cea-48c6-9ed8-c57b73bdf584'
              sx={{height: '100px', width: 'auto'}}
            />
          </Box>
          <Typography color='white'>When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.</Typography>
          <Typography color='gray'>Stars: </Typography>
          <Typography color='white'>Robert Pattinson, Zoë Kravitz, Jeffrey Wright</Typography>
          <Typography color='gray'>Director: </Typography>
          <Typography color='white'>Matt Reeves</Typography>
        </Box>
      </Box>
    </Box>
  </Grid>
)

PromoMovie.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PromoMovie)
