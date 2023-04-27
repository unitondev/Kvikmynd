import axios from 'axios'
import _ from 'lodash'

const getHeaders = (httpMethod, accessToken, additionalHeaders = {}) => {
  let headers = {
    'Content-Type': 'application/json; charset=utf-8',
    ...additionalHeaders,
  }

  if (_.isEqual(_.lowerCase(httpMethod), 'post')) headers['Accept'] = 'application/json'

  if (_.isString(accessToken) && accessToken.length !== 0)
    headers['Authorization'] = `Bearer ${accessToken}`

  return headers
}

export default (paramsObject) => {
  const { apiHostName, accessToken, data, signal } = paramsObject

  return axios({
    ...data,
    headers: getHeaders(data.method, accessToken, data.headers),
    url: data.url && data.url.indexOf('http') === 0 ? data.url : `${apiHostName}${data.url}`,
    signal,
  })
    .then((response) => {
      return response
    })
    .catch((error) => {
      if (!axios.isCancel(error)) {
        const { statusText, status } = error.response || {}

        const errorObject = { statusText, status, response: error.response }
        console.error('paramsObject:', paramsObject, '; errorObject:', errorObject)
        throw errorObject
      }
    })
}
