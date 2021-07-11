// try it
// const jwt = useSelector(state => state && state.login && state.login.jwt);
export const getJwt = state => state.login.user !== null ? state.login.user.jwtToken : null;
export const getUser = state => state.login.user;
export const getFullName = state => state.login.user !== null ? state.login.user.fullName : null;
export const isLoginSucceeded = state => state.login.isLoginSucceeded;
// FORDEVONLY
export const getFetchedUsers = state => state.FORDEVONLY_users.fetchedUsers;
