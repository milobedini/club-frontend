export function timeUntil(date) {
  const seconds = Math.floor((date - new Date()) / 1000)
  let interval = seconds / 31536000
  if (interval > 1) {
    if (Math.floor(interval) === 1) {
      return Math.floor(interval) + ' year'
    }
    return Math.floor(interval) + ' years'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    if (Math.floor(interval) === 1) {
      return Math.floor(interval) + ' month'
    }
    return Math.floor(interval) + ' months'
  }
  interval = seconds / 86400
  if (interval > 1) {
    if (Math.floor(interval) === 1) {
      return Math.floor(interval) + ' day'
    }
    return Math.floor(interval) + ' days'
  }
  interval = seconds / 3600
  if (interval > 1) {
    if (Math.floor(interval) === 1) {
      return Math.floor(interval) + ' hour'
    }
    return Math.floor(interval) + ' hours'
  }
  interval = seconds / 60
  if (interval > 1) {
    if (Math.floor(interval) === 1) {
      return Math.floor(interval) + ' minute'
    }
    return Math.floor(interval) + ' minutes'
  }

  return Math.floor(seconds) + ' seconds'
}

export const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

export function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000)
  let interval = seconds / 31536000
  if (interval > 1) {
    if (Math.floor(interval) === 1) {
      return Math.floor(interval) + ' year'
    }
    return Math.floor(interval) + ' years'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    if (Math.floor(interval) === 1) {
      return Math.floor(interval) + ' month'
    }
    return Math.floor(interval) + ' months'
  }
  interval = seconds / 86400
  if (interval > 1) {
    if (Math.floor(interval) === 1) {
      return Math.floor(interval) + ' day'
    }
    return Math.floor(interval) + ' days'
  }
  interval = seconds / 3600
  if (interval > 1) {
    if (Math.floor(interval) === 1) {
      return Math.floor(interval) + ' hour'
    }
    return Math.floor(interval) + ' hours'
  }
  interval = seconds / 60
  if (interval > 1) {
    if (Math.floor(interval) === 1) {
      return Math.floor(interval) + ' minute'
    }
    return Math.floor(interval) + ' minutes'
  }

  return Math.floor(seconds) + ' seconds'
}
