export const returnToken = () => {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    return false;
  }
  const { accessToken } = JSON.parse(currentUser);
  return accessToken;
};
