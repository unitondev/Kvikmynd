const accountRequests = {
  loginRequest: (data) => ({
    url: 'login',
    method: 'post',
    data,
  }),
  logoutRequest: (data) => ({
    url: 'logout',
    method: 'get',
    data,
  }),
  refreshTokensRequest: () => ({
    url: 'refresh_token',
    method: 'get',
  }),
  updateUserRequest: (data) => ({
    url: 'update_user',
    method: 'post',
    data,
  }),
  deleteUserRequest: () => ({
    url: 'delete_user',
    method: 'get',
  }),
  registerRequest: (data) => ({
    url: 'register',
    method: 'post',
    data,
  }),
}

export default accountRequests
