import React, { useState } from 'react'
import { Slide } from '@mui/material'

const LeftRightSlide = (props) => {
  const [direction, setDirection] = useState('left')

  return (
    <Slide
      {...props}
      direction={direction}
      onEntered={() => setDirection('right')}
      onExited={() => setDirection('left')}
    />
  )
}

export default LeftRightSlide
