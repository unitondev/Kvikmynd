export const root = `/`
export const login = `/login`
export const register = `/register`
export const profile = `/profile`
export const movieWithId = `/movie:id`
export const movie = (id) => `/movie${id}`
export const searchWithQuery = `/search`
export const search = (searchQuery) => `/search?query=${searchQuery}`

export default {
  root,
  login,
  register,
  profile,
  movieWithId,
  movie,
  searchWithQuery,
  search,
}
