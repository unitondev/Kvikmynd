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
  getMovieBySearchRequest: ({ PageNumber, PageSize, SearchQuery }) => ({
    url: 'api/movie',
    method: 'get',
    params: {
      PageNumber,
      PageSize,
      SearchQuery,
    },
  }),
  getArchivedMovieBySearchRequest: ({ PageNumber, PageSize, SearchQuery }) => ({
    url: 'api/movie/archived',
    method: 'get',
    params: {
      PageNumber,
      PageSize,
      SearchQuery,
    },
  }),
  createMovieRequest: (data) => ({
    url: 'api/movie',
    method: 'post',
    data,
  }),
  deleteMovieRequest: ({ id }) => ({
    url: `api/movie/${id}`,
    method: 'delete',
  }),
  deleteMoviePermanentlyRequest: ({ id }) => ({
    url: `api/movie/${id}/permanently`,
    method: 'delete',
  }),
  updateMovieRequest: (data) => ({
    url: 'api/movie',
    method: 'put',
    data,
  }),
  restoreMovieRequest: ({ id }) => ({
    url: `api/movie/${id}/restore`,
    method: 'put',
  }),
  movieListRequest: ({ PageNumber, PageSize, SearchQuery }) => ({
    url: 'api/movie',
    method: 'get',
    params: {
      PageNumber,
      PageSize,
      SearchQuery,
    },
  }),
  getMyMoviesRatingsListRequest: ({ PageNumber, PageSize, UserId, Order }) => ({
    url: 'api/movie/myRatings',
    method: 'get',
    params: {
      UserId,
      Order,
      PageNumber,
      PageSize,
    },
  }),
  addMovieToBookmarkRequest: (data) => ({
    url: 'api/movie/bookmark',
    method: 'post',
    data,
  }),
  deleteMovieBookmarkRequest: (data) => ({
    url: 'api/movie/bookmark',
    method: 'delete',
    data,
  }),
  getBookmarksMoviesRequest: ({ PageNumber, PageSize }) => ({
    url: 'api/movie/bookmark',
    method: 'get',
    params: {
      PageNumber,
      PageSize,
    },
  }),
  getAllMoviesForBackupRequest: () => ({
    url: 'api/movie/backup',
    method: 'get',
  }),
  restoreAllMoviesRequest: (data) => ({
    url: 'api/movie/restore',
    method: 'post',
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
}

export default movieRequests
