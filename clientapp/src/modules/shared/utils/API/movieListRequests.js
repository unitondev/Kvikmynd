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
}

export default movieListRequests
