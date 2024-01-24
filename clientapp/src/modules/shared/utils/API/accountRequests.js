const accountRequests = {
  logoutRequest: (data) => ({
    url: 'api/account/logout',
    method: 'post',
    data,
  }),
  refreshTokensRequest: () => ({
    url: 'api/refreshToken',
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
    url: 'api/account',
    method: 'post',
    data,
  }),
  getTokenRequest: (data) => ({
    url: 'api/token',
    method: 'post',
    data,
  }),
  getMeRequest: () => ({
    url: 'api/account',
    method: 'get',
  }),
  changePasswordRequest: (data) => ({
    url: 'api/account/password',
    method: 'put',
    data,
  }),
  forgotPasswordRequest: (data) => ({
    url: 'api/account/password/forgot',
    method: 'put',
    data,
  }),
  resetPasswordRequest: (data) => ({
    url: 'api/account/password/reset',
    method: 'put',
    data,
  }),
  confirmEmailRequest: (data) => ({
    url: 'api/account/email/confirm',
    method: 'post',
    data,
  }),
}

export default accountRequests
