export const getJwt = state => state.login.user?.jwtToken;
export const getUser = state => state.login.user;
export const getFullName = state => state.login.user?.fullName;
export const isLoginSucceeded = state => state.login?.isLoginSucceeded;
export const getUserAvatar = state => state.login.user?.avatar;
export const getUserLoading = state => state.login.loading;
export const getNotifications = state => state.snackbar.notifications;
export const getMovieList = state => state.movieList.movies;
export const getMovie = state => state.movie.movie;
export const getMovieGenres = state => state.movie.genres;
export const getComments = state => state.movie.comments;
export const getRatings = state => state.movie.ratings;
export const getUserRating = state => state.movie.userRating;
export const getMovieLoading = state => state.movie.loading;