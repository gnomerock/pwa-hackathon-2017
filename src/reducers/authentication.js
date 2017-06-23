const initState = {
  isAuthenticated: false
}

const authentication = (state=initState , action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isAuthenticated: true
      }
    case 'LOGOUT':
      return {
        isAuthenticated: false
      }
    default:
      return state
  }
}

export default authentication
