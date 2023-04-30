import accountRequests from './accountRequests'
import movieRequests from './movieRequests'
import ratingRequests from './ratingRequests'

const APIRequests = {
  ...accountRequests,
  ...movieRequests,
  ...ratingRequests,
}

export default APIRequests
