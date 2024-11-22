import './style.css';
import router from './js/router';
import { logOut } from './js/utilities/logout';
//
import { testReadListings } from './js/model/listings/readListings';
import { createListing } from './js/model/listings/create';
//

window.addEventListener('DOMContentLoaded', () => {
  router(window.location.pathname);
  document.getElementById('logOutBtn').addEventListener('click', logOut);
});
await testReadListings();
