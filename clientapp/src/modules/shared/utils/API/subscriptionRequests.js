const subscriptionRequests = {
  getMySubscriptionsRequest: () => ({
    url: 'api/subscription/user',
    method: 'get',
  }),
  getSubscriptionsByUdRequest: ({ id }) => ({
    url: `api/subscription/${id}`,
    method: 'get',
  }),
  createSubscriptionRequest: (data) => ({
    url: 'api/subscription',
    method: 'post',
    data,
  }),
  updateSubscriptionRequest: (data) => ({
    url: 'api/subscription',
    method: 'put',
    data,
  }),
  cancelSubscriptionRequest: ({ id }) => ({
    url: `api/subscription/${id}`,
    method: 'delete',
  }),
}

export default subscriptionRequests
