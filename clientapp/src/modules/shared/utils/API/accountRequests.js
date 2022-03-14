const accountRequests = {
  logoutRequest: (data) => ({
    url: 'api/account/logout',
    method: 'get',
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
    url: 'api/account/register',
    method: 'post',
    data,
  }),
  getTokenRequest: (data) => ({
    url: 'api/token',
    method: 'post',
    data,
  }),
  getMeRequest: () => ({
    url: 'api/account/me',
    method: 'get',
  }),
  changePasswordRequest: (data) => ({
    url: 'api/account/changePassword',
    method: 'post',
    data,
  }),
  forgotPasswordRequest: (data) => ({
    url: 'api/account/forgotPassword',
    method: 'post',
    data,
  }),
  resetPasswordRequest: (data) => ({
    url: 'api/account/resetPassword',
    method: 'post',
    data,
  }),
  confirmEmailRequest: (data) => ({
    url: 'api/account/confirmEmail',
    method: 'post',
    data,
  })
}

export default accountRequests
