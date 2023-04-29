import React, { useCallback } from 'react'
import { Grid, PaginationItem, Pagination as MuiPagination } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { addQueryToUrl } from '@movie/modules/movieList/helpers'
import styles from './styles'
import withStyles from '@mui/styles/withStyles'

const Pagination = ({ classes, pageNumber, pagesTotalCount }) => {
  const location = useSelector((state) => state.router.location)

  const generateUrlWithPageQuery = useCallback(
    (page) => {
      return addQueryToUrl('page', page, location.pathName, location.search)
    },
    [location]
  )

  return (
    <Grid item className={classes.paginationBlock}>
      <MuiPagination
        page={pageNumber}
        count={pagesTotalCount}
        color='primary'
        showFirstButton
        showLastButton
        renderItem={(item) => (
          <PaginationItem component={Link} to={generateUrlWithPageQuery(item.page)} {...item} />
        )}
      />
    </Grid>
  )
}

Pagination.propTypes = {
  classes: PropTypes.object.isRequired,
  pageNumber: PropTypes.number.isRequired,
  pagesTotalCount: PropTypes.number.isRequired,
}

export default withStyles(styles)(Pagination)
