export const login = () => {
  console.log('DO LOGIN');
  return {
    type: 'LOGIN'
  }
}

export const logout = () => {
  console.log('DO LOGOUT');
  return {
    type: 'LOGOUT'
  }
}
