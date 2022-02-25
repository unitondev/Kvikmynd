import { Typography } from '@mui/material'
import Link from '@mui/material/Link'

const Copyright = (props) => (
  <Typography variant='body2' color='text.secondary' align='center' {...props}>
    {'Copyright © '}
    <Link color='inherit' href='#'>
      MovieSite
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
)

export default Copyright
