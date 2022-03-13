export const root = `/`
export const login = `/login`
export const register = `/register`
export const profile = `/profile`
export const movieWithId = `/movie/:id`
export const movie = (id) => `/movie/${id}`
export const search = `/search`
export const forgotPassword = `/forgotPassword`
export const resetPassword = `/resetPassword`

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
}
