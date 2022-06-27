import { getToken } from './auth'

export const baseUrl = 'https://club-mb.herokuapp.com/api/'

export const getSquads = (url, method = 'get') => {
  const config = {
    method,
    url: `${baseUrl}squads/`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  }
  return config
}
