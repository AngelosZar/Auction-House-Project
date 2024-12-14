import './style.css';
import router from './js/router';
import { logOut } from './js/utilities/logout';
import { updateNavBar } from './js/utilities/updateNavBar';
// import { updateNavBar } from './js/utilities/updateNavBar';
// //
// import { createListing } from './js/model/listings/create';
// import { updateListing } from './js/model/listings/update';
// import { readListing } from './js/model/listings/readListings';
// import { deleteListing } from './js/model/listings/delete';
// import { bidOnListing } from './js/model/listings/bid';
// import { searchListings, searchProfiles } from './js/model/listings/search';
// import { filterByTag } from './js/model/listings/filter';
import { searchOverlay } from './js/views/searchOverlay';

window.addEventListener('DOMContentLoaded', () => {
  router(window.location.pathname);
  document.getElementById('logOutBtn')?.addEventListener('click', logOut);
  searchOverlay();
  updateNavBar();
});
// document.querySelectorAll('a').forEach((link) => {
//   link.addEventListener('click', (e) => {
//     e.preventDefault();
//     const path = e.currentTarget.getAttribute('href');
//     window.history.pushState({}, '', path);
//     router(path);
//   });
// });
