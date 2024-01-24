import accountRequests from './accountRequests'
import movieRequests from './movieRequests'
import ratingRequests from './ratingRequests'
import subscriptionRequests from './subscriptionRequests'

const APIRequests = {
  ...accountRequests,
  ...movieRequests,
  ...ratingRequests,
  ...subscriptionRequests,
}

export default APIRequests
