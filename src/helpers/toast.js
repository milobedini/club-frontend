import { toast } from 'react-toastify'

export const success = (message) => {
  toast.success(message, {
    position: 'bottom-center',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  setTimeout(() => {
    window.location.reload()
  }, 3000)
}

export const simpleSuccess = (message) => {
  toast.success(message, {
    position: 'bottom-center',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}
