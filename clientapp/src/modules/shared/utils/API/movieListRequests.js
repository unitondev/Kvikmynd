const movieListRequests = {
  movieListRequest: ({ PageNumber = 1, PageSize = 5 }) => ({
    url: 'api/movie',
    method: 'get',
    params: {
      PageNumber,
      PageSize,
    }
  }),
}

export default movieListRequests
