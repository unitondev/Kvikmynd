export const calculateMovieRating = (ratings) => {
  if (ratings.length === 0) return 0
  const ratingSum = ratings.reduce((prev, current) => prev + current.value, 0)
  return ratingSum / ratings.length
}
