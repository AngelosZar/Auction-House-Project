import { returnToken } from './returnToken';

export const updateNavBar = function () {
  const logOutLink = document.querySelector('#log-out-link');
  const signInLink = document.querySelector('#sign-in-link');
  const signUpLink = document.querySelector('#sign-up-link');
  const profileLink = document.querySelector('#profile-link');
  const viewListingsView = document.querySelector('#view-listings-link');
  const createListingView = document.querySelector('#create-listings-link');

  if (returnToken()) {
    logOutLink.style.display = 'block';
    signInLink.style.display = 'none';
    profileLink.style.display = 'block';
    viewListingsView.style.display = 'block';
    signUpLink.style.display = 'none';
    createListingView = 'block';
  } else {
    logOutLink.style.display = 'none';
    signInLink.style.display = 'block';
    profileLink.style.display = 'none';
    viewListingsView.style.display = 'none';
    signUpLink.style.display = 'block';
    createListingView.classList.add('hidden');
  }
};
