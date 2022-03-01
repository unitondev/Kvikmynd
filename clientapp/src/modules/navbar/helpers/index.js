export const setColorBasedOnRating = (rating) => {
  if (rating === 0) return 'gray'
  if (rating > 7) return 'green'
  if (rating > 4) return 'gray'
  return 'red'
}
