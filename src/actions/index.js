export const login = (user, token) => {
  console.log('DO LOGIN');
  return {
    type: 'LOGIN',
    user: user,
    token: token
  }
}

export const logout = () => {
  console.log('DO LOGOUT');
  return {
    type: 'LOGOUT'
  }
}
