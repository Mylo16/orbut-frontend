export const saveUserToLocalStorage = (user, token) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
};

export const getUserFromLocalStorage = () => JSON.parse(localStorage.getItem('user'));

export const getUserTokenFromLocalStorage = () => localStorage.getItem('token');

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};
