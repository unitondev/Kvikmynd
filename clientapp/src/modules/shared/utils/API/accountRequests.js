const accountRequests = {
  loginRequest: (data) => ({
    url: 'api/account/login',
    method: 'post',
    data,
  }),
  logoutRequest: (data) => ({
    url: 'api/account/logout',
    method: 'get',
    data,
  }),
  refreshTokensRequest: () => ({
    url: 'api/account/refreshToken',
    method: 'get',
  }),
  updateUserRequest: (data) => ({
    url: 'api/account',
    method: 'put',
    data,
  }),
  deleteUserRequest: () => ({
    url: 'api/account',
    method: 'delete',
  }),
  registerRequest: (data) => ({
    url: 'api/account/register',
    method: 'post',
    data,
  }),
}

export default accountRequests
