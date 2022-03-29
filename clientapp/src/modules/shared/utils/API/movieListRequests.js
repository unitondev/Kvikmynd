const movieListRequests = {
  movieListRequest: ({ PageNumber, PageSize, SearchQuery }) => ({
    url: 'api/movie',
    method: 'get',
    params: {
      PageNumber,
      PageSize,
      SearchQuery,
    }
  }),
  getMyMoviesRatingsListRequest: (data) => ({
    url: 'api/movie/getMyMoviesRatings',
    method: 'post',
    data,
  }),
  addMovieToBookmarkRequest: (data) => ({
    url: 'api/movie/addBookmark',
    method: 'post',
    data,
  }),
  deleteMovieBookmarkRequest: (data) => ({
    url: 'api/movie/deleteBookmark',
    method: 'delete',
    data,
  }),
  getBookmarksMoviesRequest: ({ PageNumber, PageSize, }) => ({
    url: 'api/movie/getBookmarks',
    method: 'get',
    params: {
      PageNumber,
      PageSize,
    }
  }),

}

export default movieListRequests
