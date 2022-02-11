export const getUserLoading = (state) => state.login.me.loading
export const isLoginSucceeded = (state) => state.login.me?.isLoginSucceeded
export const getUser = (state) => state.login.me.user
export const getUserAvatar = (state) => state.login.me.user?.avatar
export const getFullName = (state) => state.login.me.user?.fullName
export const getJwt = (state) => state.login.me.user?.jwtToken