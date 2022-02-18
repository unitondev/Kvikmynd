export const getIsUserLoading = (state) => state.account.isLoading

export const getIsLoginSucceeded = (state) => state.account.isLoginSucceeded

export const getUser = (state) => state.account.me
export const getUserAvatar = (state) => state.account.me?.avatar
export const getFullName = (state) => state.account.me?.fullName
export const getJwt = (state) => state.account.token