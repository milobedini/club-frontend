export const initialState = {
  user: localStorage.getItem('token')
    ? {
        id: JSON.parse(JSON.stringify(localStorage.getItem('userId'))),
        name: JSON.parse(JSON.stringify(localStorage.getItem('name'))),
      }
    : null,
}

const userReducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      }
    default:
      return state
  }
}

export default userReducer
