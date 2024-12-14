import { returnToken } from './returnToken';

export const updateNavBar = function () {
  const logOutLink = document.querySelector('#log-out-link');
  const signInLink = document.querySelector('#sign-in-link');
  const signUpLink = document.querySelector('#sign-up-link');
  const profileLink = document.querySelector('#profile-link');
  const viewListingsView = document.querySelector('#view-listings-link');
  let createListingView = document.querySelector('#create-listings-link');

  if (returnToken()) {
    if (logOutLink) logOutLink.style.display = 'block';
    if (signInLink) signInLink.style.display = 'none';
    if (profileLink) profileLink.style.display = 'block';
    if (viewListingsView) viewListingsView.style.display = 'block';
    if (signUpLink) signUpLink.style.display = 'none';
    if (createListingView) createListingView = 'block';
  } else {
    if (logOutLink) logOutLink.style.display = 'none';
    if (signInLink) signInLink.style.display = 'block';
    if (profileLink) profileLink.style.display = 'none';
    if (viewListingsView) viewListingsView.style.display = 'none';
    if (signUpLink) signUpLink.style.display = 'block';
    if (createListingView) createListingView.classList.add('hidden');
  }
};
