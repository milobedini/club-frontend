export const getToken = () => {
  return window.localStorage.getItem('token')
}

export const setToken = (token) => {
  window.localStorage.setItem('token', token)
}

export const removeToken = () => {
  window.localStorage.removeItem('token')
}

export const getName = () => {
  return window.localStorage.getItem('name')
}

export const setName = (name) => {
  window.localStorage.setItem('name', name)
}

export const removeName = () => {
  window.localStorage.removeItem('name')
}

export const getUserId = () => {
  return window.localStorage.getItem('userId')
}

export const setUserId = (userId) => {
  window.localStorage.setItem('userId', userId)
}

export const removeUserId = () => {
  window.localStorage.removeItem('userId')
}
