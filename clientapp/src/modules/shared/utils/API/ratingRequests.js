const ratingRequests = {
  userRatingRequest: ({ userId, movieId }) => ({
    url: 'api/rating',
    method: 'get',
    params: {
      MovieId: movieId,
      UserId: userId,
    },
  }),
  setUserRatingRequest: (data) => ({
    url: 'api/rating',
    method: 'post',
    data,
  }),
  deleteUserRatingRequest: (data) => ({
    url: 'api/rating',
    method: 'delete',
    data,
  }),
}

export default ratingRequests
