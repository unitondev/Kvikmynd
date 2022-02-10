import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

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
