export const returnToken = () => {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    prompt('You have to first login to get get access token');
    return;
  }
  const { accessToken } = JSON.parse(currentUser);
  return accessToken;
};
