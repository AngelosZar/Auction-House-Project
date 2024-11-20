import './style.css';
import router from './js/router';
import { logOut } from './js/utilities/logout';

//
window.addEventListener('DOMContentLoaded', () => {
  router(window.location.pathname);
  document.getElementById('logOutBtn').addEventListener('click', logOut);
});
