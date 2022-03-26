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
  favoritesMoviesListRequest: (data) => ({
    url: 'api/movie/getFavorites',
    method: 'post',
    data,
  }),
}

export default movieListRequests
