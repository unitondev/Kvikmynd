const movieRequests = {
  selectedMovieRequest: (data) => ({
    url: `api/movie/${data}/withGenres`,
    method: 'get',
  }),
  movieCommentsRequest: (data) => ({
    url: `api/movie/${data}/comments`,
    method: 'get',
  }),
  movieRatingsRequest: (data) => ({
    url: `api/movie/${data}/ratings`,
    method: 'get',
  }),
  userRatingRequest: (data) => ({
    url: 'api/rating/get',
    method: 'post',
    data,
  }),
  setUserRatingRequest: (data) => ({
    url: 'api/rating',
    method: 'post',
    data,
  }),
  deleteUserRatingRequest: (data) => ({
    url: 'api/rating',
    method: 'delete',
    data,
  }),
  userCommentRequest: (data) => ({
    url: 'api/comment',
    method: 'post',
    data,
  }),
  deleteCommentRequest: ({ id }) => ({
    url: `api/comment/${id}`,
    method: 'delete',
  }),
  getMovieBySearchRequest: ({ PageNumber, PageSize, SearchQuery }) => ({
    url: 'api/movie',
    method: 'get',
    params: {
      PageNumber,
      PageSize,
      SearchQuery,
    }
  }),
}

export default movieRequests
