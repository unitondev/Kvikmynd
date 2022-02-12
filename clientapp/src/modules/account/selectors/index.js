export const getUserLoading = (state) => state.account.me.loading
export const isLoginSucceeded = (state) => state.account.me?.isLoginSucceeded
export const getUser = (state) => state.account.me.user
export const getUserAvatar = (state) => state.account.me.user?.avatar
export const getFullName = (state) => state.account.me.user?.fullName
export const getJwt = (state) => state.account.me.user?.jwtToken