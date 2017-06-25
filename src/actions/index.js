export const login = (user, credential) => {
  return {
    type: 'LOGIN',
    user: user,
    credential: credential
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}
