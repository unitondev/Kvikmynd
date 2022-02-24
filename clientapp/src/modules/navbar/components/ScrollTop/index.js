import React from 'react'
import PropTypes from 'prop-types'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import { Fab, Zoom } from '@mui/material'
import { Box } from '@mui/system'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const ScrollTop = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor')

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role='presentation'
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <Fab color='primary' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  )
}

ScrollTop.propTypes = {
}

export default ScrollTop
