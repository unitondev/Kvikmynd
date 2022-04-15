export const root = `/`
export const login = `/login`
export const register = `/register`
export const profile = `/profile`
export const movieWithId = `/movie/:id`
export const movie = (id) => `/movie/${id}`
export const search = `/search`
export const forgotPassword = `/forgotPassword`
export const resetPassword = `/resetPassword`
export const confirmEmail = `/confirmEmail`
export const myRatings = `/myRatings`
export const bookmarks = `/bookmarks`
export const archived = `/archived`

export default {
  root,
  login,
  register,
  profile,
  movieWithId,
  movie,
  search,
  forgotPassword,
  resetPassword,
  confirmEmail,
  myRatings,
  bookmarks,
  archived,
}
