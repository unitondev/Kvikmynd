import { createSelector } from 'reselect'

export const getIsUserLoading = (state) => state.account.isLoading

export const getIsLoginSucceeded = (state) => state.account.isLoginSucceeded
export const getIsForgotPasswordSucceeded = (state) => state.account.isForgotPasswordSucceeded
export const getIsResetPasswordSucceeded = (state) => state.account.isResetPasswordSucceeded

export const getIsRegisterSucceeded = (state) => state.account.isRegisterSucceeded
export const getIsConfirmEmailSucceeded = (state) => state.account.isConfirmEmailSucceeded

export const getUser = (state) => state.account.me
export const getUserAvatar = (state) => state.account.me?.avatarUrl
export const getFullName = (state) => state.account.me?.fullName
export const getJwt = (state) => state.account.token
export const getUserId = (state) => state.account.me.id

export const getMySubscriptionsSelector = (state) => state.account.subscriptions.list

export const hasActiveSubscriptionsByType = createSelector(
  [getMySubscriptionsSelector, (_, subscriptionType) => subscriptionType],
  (mySubscriptions, subscriptionType) => {
    const activeSubscriptions = mySubscriptions.filter(
      (s) => s.active === true && s.type === subscriptionType
    )
    return activeSubscriptions.length !== 0
  }
)
