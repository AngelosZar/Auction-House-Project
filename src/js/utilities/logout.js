export const logOut = (e) => {
  e.preventDefault();
  localStorage.removeItem('currentUser');
  localStorage.removeItem('API_KEY');
  localStorage.removeItem('listingId');
  window.location.href = '/';
};
