export const logOut = (e) => {
  e.preventDefault();
  localStorage.removeItem('currentUser');
  window.location.href = '/';
};
