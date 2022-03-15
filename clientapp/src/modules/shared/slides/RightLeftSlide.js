import React, { useState } from 'react'
import { Slide } from '@mui/material'

const RightLeftSlide = (props) => {
  const [direction, setDirection] = useState('right')

  return (
    <Slide
      {...props}
      direction={direction}
      onEntered={() => setDirection('left')}
      onExited={() => setDirection('right')}
    />
  )
}

export default RightLeftSlide
