const movieRequests = {
  selectedMovieRequest: (data) => ({
    url: `api/movie${data}/withGenres`,
    method: 'get',
  }),
  movieCommentsRequest: (data) => ({
    url: `api/movie${data}/comments`,
    method: 'get',
  }),
  movieRatingsRequest: (data) => ({
    url: `api/movie${data}/ratings`,
    method: 'get',
  }),
  userRatingRequest: (data) => ({
    url: 'get_rating',
    method: 'post',
    data,
  }),
  setUserRatingRequest: (data) => ({
    url: 'create_rating',
    method: 'post',
    data,
  }),
  userCommentRequest: (data) => ({
    url: 'add_comment',
    method: 'post',
    data,
  }),
  deleteCommentRequest: ({ id }) => ({
    url: `delete_comment${id}`,
    method: 'get',
  }),
}

export default movieRequests
