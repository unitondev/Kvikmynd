export const getMovieList = (state) => state.movieList.list.items
export const getMovieListTotalCount = (state) => state.movieList.list.totalCount
export const getIsMovieListLoading = (state) => state.movieList.list.isLoading
export const getMovieSearchList = (state) => state.movieList.searchList

export const getFavoritesMoviesList = (state) => state.movieList.favoritesMoviesList.items
export const getFavoritesMoviesListTotalCount = (state) =>
  state.movieList.favoritesMoviesList.totalCount
export const getIsFavoritesMoviesListLoading = (state) =>
  state.movieList.favoritesMoviesList.isLoading

export const getBookmarkMoviesList = (state) => state.movieList.bookmarkMoviesList.items
export const getBookmarkMoviesListTotalCount = (state) =>
  state.movieList.bookmarkMoviesList.totalCount
export const getBookmarkMoviesListLoading = (state) => state.movieList.bookmarkMoviesList.isLoading

export const getArchivedMoviesList = (state) => state.movieList.archivedMovieList.items
export const getArchivedMoviesListTotalCount = (state) =>
  state.movieList.archivedMovieList.totalCount
export const getArchivedMoviesListLoading = (state) => state.movieList.archivedMovieList.isLoading
