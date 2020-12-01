export const getAuth = () => {
  return {
    username: localStorage.getItem('username'),
    password: localStorage.getItem('password')
  }
}

export const login = (username, password) => {
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);
};

export const logout = () => {
  localStorage.removeItem('username')
  localStorage.removeItem('password')
}

export const isAuthenticated = () => !!localStorage.getItem('username') && !!localStorage.getItem('password');
