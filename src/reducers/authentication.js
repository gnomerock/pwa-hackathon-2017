const initState = {
  isAuthenticated: false,
  user: null,
  credential: null,
}

const authentication = (state=initState , action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isAuthenticated: true,
        user: action.user,
        credential: action.credential,
      }
    case 'LOGOUT':
      return {
        isAuthenticated: false,
        user: null,
        credential: null,
      }
    default:
      return state
  }
}

export default authentication
