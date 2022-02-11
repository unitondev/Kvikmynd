import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'

export const AvatarPreview = ({ file, classes }) => {
  const [previewString, setPreviewString] = useState(null)

  useEffect(() => {
    if (!!file && typeof file === 'object') {
      let reader = new FileReader()
      reader.onloadend = () => {
        setPreviewString(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }, [file])

  return <div>{!!previewString ? <Avatar src={previewString} className={classes} /> : null}</div>
}
