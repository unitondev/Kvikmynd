export const getJwt = state => state.login.user && state.login.user.jwtToken;
export const getUser = state => state.login.user;
export const getFullName = state => state.login.user && state.login.user.fullName;
export const isLoginSucceeded = state => state.login.isLoginSucceeded;
