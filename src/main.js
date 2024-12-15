import './style.css';
import router from './js/router';
import { logOut } from './js/utilities/logout';
import { updateNavBar, initNavBarListeners } from './js/utilities/updateNavBar';
import { searchOverlay } from './js/views/searchOverlay';
import { initHeaderSideBar } from './js/utilities/initHeaderSideBar';
// import { initThemeToggle } from './js/utilities/initThemeToggle';
window.addEventListener('DOMContentLoaded', () => {
  router(window.location.pathname);
  initHeaderSideBar();
  // initThemeToggle();
  document.getElementById('logOutBtn')?.addEventListener('click', logOut);
  searchOverlay();
  updateNavBar();
  initNavBarListeners();
});
