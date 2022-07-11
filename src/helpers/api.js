import { getToken } from './auth'

export const baseUrl = 'https://club-mb.herokuapp.com/api/'

export const getConfig = (url, method = 'get') => {
  const config = {
    method,
    url: `${baseUrl}${url}/`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  }
  return config
}

export const getPostConfig = (url, data, method = 'post') => {
  const config = {
    method,
    url: `${baseUrl}${url}/`,
    data,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  }
  return config
}
