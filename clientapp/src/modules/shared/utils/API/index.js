import accountRequests from './accountRequests'
import movieRequests from './movieRequests'
import movieListRequests from './movieListRequests'

const APIRequests = {
  ...accountRequests,
  ...movieRequests,
  ...movieListRequests,
}

export default APIRequests