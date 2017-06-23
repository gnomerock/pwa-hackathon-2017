const initState = {
  isAuthenticated: false,
  user: null,
  token: null
}

const authentication = (state=initState , action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isAuthenticated: true,
        user: action.user,
        token: action.token
      }
    case 'LOGOUT':
      return {
        isAuthenticated: false,
        user: null,
        token: null
      }
    default:
      return state
  }
}

export default authentication
