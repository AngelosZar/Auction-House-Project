import { returnToken } from './returnToken';

export const updateNavBar = function () {
  const logOutLink = document.getElementById('log-out-link');
  const signInLink = document.getElementById('sign-in-link');
  const signUpLink = document.getElementById('sign-up-link');
  const profileLink = document.getElementById('profile-link');
  const viewListingsView = document.getElementById('view-listings-link');

  if (returnToken) {
    logOutLink.style.display = 'block';
    signInLink.style.display = 'none';
    profileLink.style.display = 'block';
    viewListingsView.style.display = 'block';
    signUpLink.style.display = 'none';
  } else {
    logOutLink.style.display = 'none';
    signInLink.style.display = 'block';
    profileLink.style.display = 'none';
    viewListingsView.style.display = 'none';
    signUpLink.style.display = 'block';
  }
};
